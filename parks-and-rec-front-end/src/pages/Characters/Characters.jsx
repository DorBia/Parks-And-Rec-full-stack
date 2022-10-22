import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Characters.scss";

const Characters = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    const result = await axios.get("http://localhost:8080/character/all", {
      validateStatus: (status) => status === 302,
    });
    setCharacters(result.data);
  };

  return (
    <div className="container text-center">
      <Link to="/addcharacter" className="btn btn-lg btn-outline-dark mx-2 my-3">
        Add Character
      </Link>
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th className="border-end">Picture</th>
              <th className="border-end">Name</th>
              <th className="border-end">Actor/Actress</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {characters.map((character) => {
              return (
                <tr key={character.id} className="align-middle">
                  <td className="col-1 border-end">
                    <img
                      className="img-small"
                      src={character.charactersPictureLink}
                      alt={character.charactersName}
                    />
                  </td>
                  <td className="col-3 border-end">
                    <Link to={`/character/${character.id}`}>
                      {character.charactersName}
                    </Link>
                  </td>
                  <td className="col-3 border-end">{character.actorsName}</td>
                  <td className="col-1">{character.age}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Characters;
