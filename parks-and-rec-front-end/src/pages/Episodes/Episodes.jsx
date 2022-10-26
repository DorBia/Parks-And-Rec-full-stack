
import { useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

const Episodes = ({episodes, loadEpisodes, loading}) => {

  useEffect(() => {
    loadEpisodes();
    //eslint-disable-next-line
  },[])

  return (<>
    {loading && <LoadingScreen />}
    {!loading && 
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
              return (
                <tr key={episode.id} className="align-middle">
                  <td className="col-1 border-end">{episode.episodesNumber}</td>

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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>}
    </>
  );
};

export default Episodes;
