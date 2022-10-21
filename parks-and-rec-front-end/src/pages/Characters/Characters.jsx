import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Characters = () => {
  
const [ characters, setCharacters ] = useState([]);

useEffect(() => {
  loadCharacters();
},[])

const loadCharacters = async () =>{
  const result = await axios.get("http://localhost:8080/character/all", {validateStatus: (status) => status === 302});
    setCharacters(result.data);
}

const deleteCharacter = async (id) => {
  await axios.delete(`http://localhost:8080/character/${id}`)
  loadCharacters();
}

return (
  <div className="container">
    <Link to="/addcharacter" className="btn btn-outline-primary mx-2" onClick={() => console.log(characters)}>Click</Link>
    <div className="py-4">
    <table className="table border shadow">
<thead>
  <tr>
    <th scope="col">Name</th>
    <th scope="col">Age</th>
    <th scope="col">Description</th>
    <th scope="col">Actor/Actress</th>
    <th scope="col">Link</th>
    {/* <th scope="col">Episodes</th>
    <th scope="col">Seasons</th> */}
    <th scope="col">Actions</th>
  </tr>
</thead>
<tbody>

{characters.map((character) => {
  // const episodesArr = character.episodesCharacter.map(episode => {
  //   if(episode.id){
  //     return <Link to={`/episode/${episode.id}`} key={`${character.id}, ${episode.id}`}>{episode.episodesName}</Link>;
  //   }
  //   return ""
  // })
  // const seasonArr = character.seasonsCharacter.map(season => {
  //   return season.seasonsNumber;
  // })
    return (<tr key={character.id}>
    <td><Link to={`/character/${character.id}`}>{character.charactersName}</Link></td>
    <td>{character.age}</td>
    <td>{character.charactersDescription}</td>
    <td>{character.actorsName}</td>
    <td>{character.charactersPictureLink}</td>
    {/* <td>{episodesArr}</td>
    <td>{seasonArr.join(", ")}</td> */}
    <td>
      <Link to={`/editcharacter/${character.id}`} className="btn btn-outline-primary mx-2">Edit</Link>
      <button className="btn btn-danger mx-2" onClick={() => deleteCharacter(character.id)}>Delete</button>
    </td>
  </tr>)
  })}
  
</tbody>
</table>
    </div>
  </div>
)
}

export default Characters