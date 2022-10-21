import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./CharacterPage.scss";

const CharacterPage = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [character, setCharacter] = useState([]);

  useEffect(() => {
    loadCharacter(id);
  }, [id]);

  const loadCharacter = async (id) => {
    const result = await axios.get(`http://localhost:8080/character/${id}`, {
      validateStatus: (status) => status === 302,
    });
    setCharacter(result.data);
  };

  const deleteCharacter = async (id) => {
    await axios.delete(`http://localhost:8080/character/${id}`)
    navigate("/characters")
  }
  const episodeJSX = character.episodesCharacter
    ? character.episodesCharacter.map((episode) => {
        if (episode.id) {
          return (
            <Link
              to={`/episode/${episode.id}`}
              key={`${character.id}, ${episode.id}`}
            >
              {episode.episodesName}{" "}
            </Link>
          );
        }
        return "";
      })
    : "";
  // const seasonJSX = character.seasonsCharacter ? character.seasonsCharacter.map(season => {
  //   return season.seasonsNumber;
  // }) : ""

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-5">{character.charactersName}</h2>
          <div className="row">
          <img
              src={character.charactersPictureLink}
              alt={character.charactersName}
              className="col-md-4 shadow rounded"
            />
            <p className="text-left col-md-8">{character.charactersDescription}</p>
          </div>
          <div className="row">
            <Link to={`/editcharacter/${character.id}`} className="btn btn-outline-primary mx-2">Edit</Link>
            <button className="btn btn-danger mx-2" onClick={() => deleteCharacter(character.id)}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;
