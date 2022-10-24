import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonsBottomRow from "../../components/ButtonsBottomRow/ButtonsBottomRow";
import InputBar from "../../components/InputBar/InputBar";
import TextArea from "../../components/TextArea/TextArea";

const EpisodeForm = ({ condition, seasons }) => {
  let navigate = useNavigate();
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
  } = episode;

  const onInputChange = (e) =>
    setEpisode({ ...episode, [e.target.name]: e.target.value });

  useEffect(() => {
    loadEpisode(id, condition);
  }, [id, condition]);

  const onSubmit = async (e, exists) => {
    e.preventDefault();
    if (exists) {
      await axios.put(`http://localhost:8080/episode/${id}`, episode);
      navigate(`/episode/${id}`);
    } else {
      await axios.post("http://localhost:8080/episode/create", episode);
      navigate("/episodes");
    }
  };

  const loadEpisode = async (id, exists) => {
    if (exists) {
      const result = await axios.get(`http://localhost:8080/episode/${id}`, {
        validateStatus: (status) => status === 302,
      });
      setEpisode(result.data);
    }
  };

  const seasonsJSX = seasons
    ? seasons.map((season) => {
        return (
          <div key={`season${season.id}`} className="col">
            <label className="mx-1">
              {season.seasonsNumber}{" "}
              <input
                type="radio"
                id={`season${season.seasonsNumber}`}
                checked={episode.seasonsEpisode?.id === season.id || false}
                value={season || ""}
                onChange={() =>
                  setEpisode({ ...episode, seasonsEpisode: season })
                }
              />
            </label>
          </div>
        );
      })
    : null;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 border rounded p-4 mt-5 shadow">
          {condition && <h2 className="text-center m-4">Edit Episode</h2>}
          {!condition && <h2 className="text-center m-4">Add Episode</h2>}
          <form onSubmit={(e) => onSubmit(e, condition)}>
            <InputBar
              type="text"
              placeholder="Name"
              name="episodesName"
              id="name"
              value={episodesName}
              onInputChange={onInputChange}
              required={true}
            />
            <InputBar
              type="number"
              placeholder="Number"
              name="episodesNumber"
              id="number"
              value={episodesNumber}
              onInputChange={onInputChange}
              required={true}
            />
            <InputBar
              type="number"
              placeholder="Length (minutes)"
              name="episodesLengthMinutes"
              id="length"
              value={episodesLengthMinutes}
              onInputChange={onInputChange}
              required={true}
            />
            <TextArea
              name="episodesDescription"
              value={episodesDescription}
              onInputChange={onInputChange}
            />
            <InputBar
              type="text"
              placeholder="Picture's Link"
              name="episodesPicture"
              id="length"
              value={episodesPicture}
              onInputChange={onInputChange}
              required={false}
            />
            <p className="text-center">Choose season:</p>
            <div className="row mb-3">{seasonsJSX}</div>
            <ButtonsBottomRow destination="/episodes" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EpisodeForm;
