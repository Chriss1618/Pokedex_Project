import { useEffect } from 'react';

export function PokeCard(props){

  const { selectedPokemon } = props;
  const [data, setData] = useState(null);
  
  useEffect( () =>{

  },[selectedPokemon])
  return (
    <div></div>
  )
}