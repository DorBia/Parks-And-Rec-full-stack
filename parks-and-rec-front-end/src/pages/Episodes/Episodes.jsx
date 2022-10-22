import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    loadEpisodes();
  }, []);

  const loadEpisodes = async () => {
    const result = await axios.get("http://localhost:8080/episode/all", {
      validateStatus: (status) => status === 302,
    });
    setEpisodes(result.data);
  };

  // const deleteEpisode = async (id) => {
  //   await axios.delete(`http://localhost:8080/episode/${id}`);
  //   loadEpisodes();
  // };

  return (
    <div className="container text-center col-12 col-lg-9 col-xl-6">
      <Link to="/addepisode" className="btn btn-lg btn-outline-dark mx-2 my-3">
        Add Episode
      </Link>
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
            <th className="border-end">Number</th>
            <th className="border-end">Picture</th>
              <th className="border-end">Name</th>
              <th className="border-end">Length</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((episode) => {
              // const charactersArr = episode.charactersInEpisode.map(
              //   (character) => {
              //     if (character.id) {
              //       return (
              //         <Link
              //           to={`/character/${character.id}`}
              //           key={`${character.id}, ${episode.id}`}
              //         >
              //           {character.charactersName}{" "}
              //         </Link>
              //       );
              //     }
              //     return "";
              //   }
              // );
              // const season = episode.seasonsEpisode
              //   ? episode.seasonsEpisode.seasonsNumber
              //   : "";
              return (
                <tr key={episode.id} className="align-middle">
                  <td className="col-1 border-end">{episode.episodeNumber}</td>

                  <td className="col-5 border-end">
                    <img
                      className="img-fluid"
                      src={episode.episodesPicture}
                      alt={episode.episodesName}
                    />
                  </td>
                  <td className="col-4 border-end">
                    <Link to={`/episode/${episode.id}`}>
                      {episode.episodesName}
                    </Link>
                  </td>
                  <td className="col-2">{episode.episodesLengthMinutes} mins</td>
                  {/* <td className="col-3 border-end">{episode.episodesDescription}</td> */}
                  {/* <td className="col-1 border-end">{season}</td> */}
                  {/* <td className="col-3 border-end">
                    <Link
                      to={`/editepisode/${episode.id}`}
                      className="btn btn-outline-primary mx-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteEpisode(episode.id)}
                    >
                      Delete
                    </button>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Episodes;
