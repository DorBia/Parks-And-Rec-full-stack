import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    loadEpisodes();
  }, []);

  const loadEpisodes = async () => {
    const result = await axios.get("http://localhost:8080/episode/all", {validateStatus: (status) => status === 302});
    setEpisodes(result.data);
  };

  const deleteEpisode = async (id) => {
    await axios.delete(`http://localhost:8080/episode/${id}`);
    loadEpisodes();
  };

  return (
    <div className="container">
    <Link to="/addepisode" className="btn btn-outline-primary mx-2">Click</Link>
    <div className="py-4">
    <table className="table border shadow">
<thead>
  <tr>
    <th scope="col">Name</th>
    <th scope="col">Number</th>
    <th scope="col">Length</th>
    <th scope="col">Description</th>
    <th scope="col">Characters</th>
    <th scope="col">Season</th>
    <th scope="col">Actions</th>
  </tr>
</thead>
<tbody>

{episodes.map((episode) => {
  const charactersArr = episode.charactersInEpisode.map(character => {
    if(character.id){
        return <Link to={`/character/${character.id}`} key={`${character.id}, ${episode.id}`}>{character.charactersName} </Link>;
    }
    return "";
  })
  const seasonArr = episode.seasonsEpisode.map(season => {
    return season.seasonsNumber;
  })
    return (<tr key={episode.id}>
    <td><Link to={`/episode/${episode.episodeNumber}`}>{episode.episodesName}</Link></td>
    <td>{episode.episodeNumber}</td>
    <td>{episode.episodesLengthMinutes} mins</td>
    <td>{episode.episodesDescription}</td>
    <td>{charactersArr}</td>
    <td>{seasonArr.join(", ")}</td>
    <td>
      <Link to={`/editepisode/${episode.id}`} className="btn btn-outline-primary mx-2">Edit</Link>
      <button className="btn btn-danger mx-2" onClick={() => deleteEpisode(episode.id)}>Delete</button>
    </td>
  </tr>)
  })}
  
</tbody>
</table>
    </div>
  </div>
  );
};

export default Episodes;
