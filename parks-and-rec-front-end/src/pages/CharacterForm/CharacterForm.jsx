import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const CharacterForm = ({ condition, seasons }) => {
  let navigate = useNavigate();

  const { id } = useParams();
  const [seasonArr, setSeasonArr] = useState();

  const [character, setCharacter] = useState({
    charactersName: "",
    age: 0,
    charactersDescription: "",
    charactersPictureLink: "",
    actorsName: "",
  });

  const {
    charactersName,
    age,
    charactersDescription,
    charactersPictureLink,
    actorsName,
  } = character;

  const onInputChange = (e) => {
    setCharacter({ ...character, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadCharacter(id, condition);
  }, [id, condition]);

  const onSubmit = async (e, exists) => {
    if (exists) {
      e.preventDefault();
      await axios.put(`http://localhost:8080/character/${id}`, character);
      navigate(`/character/${id}`);
    } else {
      e.preventDefault();
      await axios.post("http://localhost:8080/character/create", character);
      navigate("/characters");
    }
  };

  const loadCharacter = async (id, exists) => {
    if (exists) {
      const result = await axios.get(`http://localhost:8080/character/${id}`, {
        validateStatus: (status) => status === 302,
      });
      setCharacter(result.data);
      setSeasonArr(result.data.seasonsCharacter);
    }
  };

  const addOrRemoveSeasons = (newSeason) => {
    seasonArr?.some((s) => s.id === newSeason.id)
      ? setSeasonArr(seasonArr?.filter((season) => season.id !== newSeason.id))
      : setSeasonArr([...seasonArr, newSeason]);
  };

  const seasonsJSX = seasons
    ? seasons.map((season) => {
        return (
          <div key={`season${season.id}`} className="col">
            <label className="mx-1">
              {season.seasonsNumber}{" "}
              <input
                type="checkbox"
                checked={seasonArr?.some((s) => s.id === season.id) || false}
                id={`season${season.seasonsNumber}`}
                defaultValue={season || ""}
                onChange={() => addOrRemoveSeasons(season)}
              />
            </label>
          </div>
        );
      })
    : null;

  return (
    <div className="container">
      <button onClick={() => console.log(seasonArr)}>click</button>
      <div className="row">
        <div className="col-md-8 offset-md-2 border rounded p-4 mt-5 shadow">
          {condition && <h2 className="text-center m-4">Edit Character</h2>}
          {!condition && <h2 className="text-center m-4">Add Character</h2>}
          <form onSubmit={(e) => onSubmit(e, condition)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="charactersName"
                id="name"
                value={charactersName || ""}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="number"
                className="form-control"
                name="age"
                id="age"
                value={age}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Description"
                name="charactersDescription"
                id="description"
                value={charactersDescription || ""}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="picture-link" className="form-label">
                Picture link
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Picture's link"
                name="charactersPictureLink"
                id="picture-link"
                value={charactersPictureLink || ""}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="actor-name" className="form-label">
                Actor's name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Actor's name"
                name="actorsName"
                id="actor-name"
                value={actorsName || ""}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <p className="text-center">Choose season:</p>
            <div className="row mb-3">{seasonsJSX}</div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-outline-primary"
                onClick={() => {
                  setCharacter({ ...character, seasonsCharacter: seasonArr });
                }}
              >
                Submit
              </button>
              <Link to="/characters" className="btn btn-outline-danger mx-2">
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
