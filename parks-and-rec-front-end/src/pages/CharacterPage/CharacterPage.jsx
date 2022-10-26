import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const CharacterPage = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [character, setCharacter] = useState([]);
  const [openSeasons, setOpenSeasons] = useState(false);
  const [openEpisodes, setOpenEpisodes] = useState(false);
  
  useEffect(() => {
    loadCharacter(id);
  }, [id]);

  const loadCharacter = async (id) => {
    const result = await axios.get(`https://parks-and-rec-123.nw.r.appspot.com/character/${id}`, {
      validateStatus: (status) => status === 302,
    });
    setCharacter(result.data);
  };

  const deleteCharacter = async (id) => {
    await axios.delete(`https://parks-and-rec-123.nw.r.appspot.com/character/${id}`);
    navigate("/characters");
  };

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
  const seasonJSX = character.seasonsCharacter
    ? character.seasonsCharacter.map((season) => {
        return <p key={season.seasonsNumber}>Season: {season.seasonsNumber}</p>;
      })
    : "";

  return (
    <div className="container py-4">
      <div className="row">
        <div className="border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-5 display-5">{character.charactersName}</h2>
          <div className="row justify-content-center">
            <div className="col-md-4 mx-2">
              <img
                src={character.charactersPictureLink}
                alt={character.charactersName}
                className="shadow rounded img-fluid"
              />
                  <div className="row mx-auto my-4 justify-content-center">
                <div className="col-4 col-md-6 col-lg-5">
              <Button
                variant="outline-dark"
                onClick={() => setOpenSeasons(!openSeasons)}
                aria-controls="example-fade-text"
                aria-expanded={openSeasons}
              >
                See Seasons
              </Button>
              <Collapse in={openSeasons}>
                <div id="example-fade-text">{seasonJSX}</div>
              </Collapse>
              </div>
              <div className="col-4 col-md-6 col-lg-5">
              <Button
                variant="outline-dark"
                onClick={() => setOpenEpisodes(!openEpisodes)}
                aria-controls="example-fade-text"
                aria-expanded={openEpisodes}
              >
                See Episodes
              </Button>
              <Collapse in={openEpisodes}>
                <div id="example-fade-text">{episodeJSX}</div>
              </Collapse>
              </div>
              </div>
            </div>
            <p className="text-left col-md-7">
              {character.charactersDescription}
            </p>
          </div>

          <div className="row justify-content-center mt-3">
            <Link
              to={`/editcharacter/${character.id}`}
              className="btn btn-outline-primary mx-2 col-3 col-md-2 p-3"
            >
              Edit
            </Link>
            <Button
              className="mx-2 col-3 col-md-2 p-3"
              variant="outline-danger"
              onClick={() => deleteCharacter(character.id)}
            >
              Delete
            </Button>
          </div>
          <Button
          variant="dark"
          className="btn py-2 px-3"
          onClick={() => navigate("/characters")}
        >
          ⇦
        </Button>
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;
