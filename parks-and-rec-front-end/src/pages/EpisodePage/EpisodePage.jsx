import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

import "./EpisodePage.scss";

const EpisodePage = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [episode, setEpisode] = useState([]);
  // const [openSeasons, setOpenSeasons] = useState(false);
  // const [openEpisodes, setOpenEpisodes] = useState(false);

  useEffect(() => {
    loadEpisode(id);
  }, [id]);

  const loadEpisode = async (id) => {
    const result = await axios.get(`http://localhost:8080/episode/${id}`, {
      validateStatus: (status) => status === 302,
    });
    setEpisode(result.data);
  };

  const deleteEpisode = async (id) => {
    await axios.delete(`http://localhost:8080/episode/${id}`);
    navigate("/episodes");
  };

  const characterJSX = episode.charactersInEpisode
    ? episode.charactersInEpisode.map((character) => {
        if (character.id) {
          return (
            <Link
              to={`/character/${character.id}`}
              key={`${episode.id}, ${character.id}`}
            >
              {" "}
              <li>{character.charactersName} </li>
            </Link>
          );
        }
        return "";
      })
    : "";

  return (
    <div className="container py-4">
      <div className="border rounded p-4 mt-2 shadow">
        <div className="row text-center">
          <div className="mx-2">
            <img
              src={episode.episodesPicture}
              alt={episode.episodesName}
              className="shadow rounded img-fluid img-edit"
            />
            <h2 className="text-center mt-5 display-3">
              {episode.episodesName}
            </h2>
            {episode.seasonsEpisode && (
              <p className="display-6">
                Season: {episode.seasonsEpisode.seasonsNumber}
              </p>
            )}
          </div>
          <p className="text-left">{episode.episodesDescription}</p>
        </div>

        <div>
          <ul>{characterJSX}</ul>
        </div>

        <div className="row justify-content-center mt-3">
          <Link
            to={`/editepisode/${episode.id}`}
            className="btn btn-outline-dark mx-2 col-3 col-md-2 p-3"
          >
            Edit
          </Link>
          <Button
            className="mx-2 col-3 col-md-2 p-3"
            variant="outline-danger"
            onClick={() => deleteEpisode(episode.id)}
          >
            Delete
          </Button>
        </div>
        <Button
          variant="dark"
          className="btn-lg"
          onClick={() => navigate("/episodes")}
        >
          &#60;-
        </Button>
      </div>
    </div>
  );
};

export default EpisodePage;
