import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SeasonPage = () => {
  const { id } = useParams();

  const [season, setSeason] = useState();

  useEffect(() => {
    loadSeason(id);
  }, [id]);

  const loadSeason = async (id) => {
    const result = await axios.get(`http://localhost:8080/season/${id}`, {validateStatus: (status) => status === 302});
    setSeason(result.data);
  };

  return (
    <div>
      <h1>Season {id}</h1>
      {/* <button onClick={() => console.log(season)}>Click</button> */}
      <h2>Episodes:</h2>
      {season?.episodesSeason.map((episode) => {
        return (
          <p key={episode.id}>{episode.episodesName}</p>
      )})}
      <h2>Characters:</h2>
      {season?.charactersSeason.map((character) => {
        return(
          <p key={character.id}>{character.charactersName}</p>)
      })}
      {/* <button onClick={() => console.log(season)}>Click</button> */}
    </div>
  );
};

export default SeasonPage;
