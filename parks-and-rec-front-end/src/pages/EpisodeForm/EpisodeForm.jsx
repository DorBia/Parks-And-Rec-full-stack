import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const CharacterForm = ({condition, seasons}) => {

  let navigate = useNavigate()

  const { id } = useParams();

  const [episode, setEpisode] = useState({
    episodesName: "",
    episodesNumber: 0,
    episodesLengthMinutes: 21,
    episodesDescription: "",
    episodesPicture: "",
  });

  const {
    episodesName,
    episodesNumber,
    episodesLengthMinutes,
    episodesDescription,
    episodesPicture,
  } = episode

  const onInputChange = (e) => {
    setEpisode({ ...episode, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadEpisode(id, condition);
  },[id, condition])

  const onSubmit = async (e, exists) => {
    if(exists){
      e.preventDefault();
      await axios.put(`http://localhost:8080/episode/${id}`, episode);
      navigate(`/episode/${id}`)
    } else {
      e.preventDefault();
      await axios.post("http://localhost:8080/episode/create",episode);
      navigate("/episodes")
    }

  }

  const loadEpisode = async (id, exists) => {
    if(exists) {
      const result = await axios.get(`http://localhost:8080/episode/${id}`, {validateStatus: (status) => status === 302});
      setEpisode(result.data)
    }
  }
  const seasonsJSX = seasons ? seasons.map(season => {
    return(
    <div key={`season${season.id}`} className="col">
      <label className="mx-1">{season.seasonsNumber} <input type="radio" id={`season${season.seasonsNumber}`} value={season || ''} onChange={() => setEpisode({ ...episode, seasonsEpisode: season })}/></label>
      
    </div>)
  }) : null;

  

  return (
    <div className="container">
      <button onClick={() => console.log(episode)}>Click</button>
      <div className="row">
        <div className="col-md-8 offset-md-2 border rounded p-4 mt-5 shadow">
          {condition && <h2 className="text-center m-4">Edit Episode</h2>}
          {!condition && <h2 className="text-center m-4">Add Episode</h2>}
          <form onSubmit={(e) => onSubmit(e, condition)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              required
              type="text"
              className="form-control"
              placeholder="Name"
              name="episodesName"
              id="name"
              value={episodesName || ""}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="number" className="form-label">
              Number
            </label>
            <input
              required
              type="number"
              className="form-control"
              name="episodesNumber"
              id="number"
              value={episodesNumber}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="length" className="form-label">
              Length (minutes)
            </label>
            <input
              required
              type="number"
              className="form-control"
              name="episodesLengthMinutes"
              id="length"
              value={episodesLengthMinutes}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              required
              type="text"
              className="form-control"
              placeholder="Description"
              name="episodesDescription"
              id="description"
              value={episodesDescription || ""}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="picture-link" className="form-label">
              Episode's picture
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Picture's Link"
              name="episodesPicture"
              id="picture-link"
              value={episodesPicture || ""}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <p className="text-center">Choose season:</p>
          <div className="row mb-3">
            {seasonsJSX}
          </div>
          <div className="text-center">
          <button type="submit" className="btn btn-outline-primary" onClick={() => console.log(episode)}>
            Submit
          </button>
          <Link to="/episodes" className="btn btn-outline-danger mx-2">
            Cancel
          </Link>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CharacterForm;
