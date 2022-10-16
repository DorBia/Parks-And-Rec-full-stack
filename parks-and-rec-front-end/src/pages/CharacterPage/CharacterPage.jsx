import { useParams } from "react-router-dom";


const CharacterPage = () => {

    const { id } = useParams();
    
  return (
    <div>Character Page {id}</div>
  )
}

export default CharacterPage