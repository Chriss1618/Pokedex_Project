import { useEffect, useState } from 'react';
import { getFullPokedexNumber, getPokedexNumber } from '../utils';
import TypeCard from './TypeCard';

export default function PokeCard(props){

  const { selectedPokemon } = props;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { name, heigh, abilities, stats, types,  moves,  sprites } = data 
    || {};
  useEffect( () =>{
    if( loading || !localStorage) return;

    let cache = {}

    if(localStorage.getItem('pokedex')){
      cache = JSON.parse(localStorage.getItem('pokedex'));
    }

    if( selectedPokemon in cache){
      setData(cache[selectedPokemon]);
      
      return 
    } 

    console.log("useEffect");
    async function fetchPokemonData(){ 
      console.log("here"); 
      setLoading(true);
      try{
        const baseURL = 'https://pokeapi.co/api/v2/';
        const suffix = 'pokemon/' + getPokedexNumber(selectedPokemon);
        const finalURL = baseURL + suffix;
        const res = await fetch(finalURL);

        console.log(res);
        const pokemonData = await res.json();
        
        setData(pokemonData);
        console.log(pokemonData);
        cache[selectedPokemon] = pokemonData;
        localStorage.setItem('pokedex', JSON.stringify(cache));

      }catch(error){
        console.error(error.message);
      } finally{
        setLoading(false);
      }

    }

    fetchPokemonData();
  },[selectedPokemon])

  if( loading || !data ){
    return (
      <div >
        <h4>Loading...</h4>
      </div>
    )
  }

  return (
    <div className='poke-card'>
      <div>
        <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
        <h4>{name}</h4>
        <div className='type-container'>
          {
            types.map((typeObj, index) => {
              return (
                <TypeCard key={index} type={typeObj?.type?.name} />
              )
            })
          }
        </div>

        <img className='default-img' src={ '/pokemon/'+ getFullPokedexNumber(selectedPokemon)+'.png' } alt={`${name}-large-img`} />
      </div>
    </div>
  )
}