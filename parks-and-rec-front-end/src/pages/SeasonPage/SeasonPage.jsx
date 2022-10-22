import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SeasonPage = () => {
  const { id } = useParams();

  const [season, setSeason] = useState();

  useEffect(() => {
    loadSeason(id);
  }, [id]);

  const loadSeason = async (id) => {
    const result = await axios.get(`http://localhost:8080/season/${id}`, {
      validateStatus: (status) => status === 302,
    });
    setSeason(result.data);
  };

  return (
    <div>
      <h1>Season {id}</h1>
      <h2>Episodes:</h2>
      {season?.episodesSeason.map((episode) => {
        return (
          <Link to={`/episode/${episode.id}`} key={episode.id}>
            {episode.episodesName}
          </Link>
        );
      })}
      <h2>Characters:</h2>
      {season?.charactersSeason.map((character) => {
        return <p key={character.id}>{character.charactersName}</p>;
      })}
    </div>
  );
};

export default SeasonPage;
