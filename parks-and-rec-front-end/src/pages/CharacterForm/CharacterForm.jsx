import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const CharacterForm = ({condition}) => {

  let navigate = useNavigate()

  const { id } = useParams();

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
  } = character

  const onInputChange = (e) => {
    setCharacter({ ...character, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser(id, condition);
  },[id, condition])

  const onSubmit = async (e, exists) => {
    if(exists){
      e.preventDefault();
      await axios.put(`http://localhost:8080/character/${id}`, character);
      navigate("/characters")
    } else {
      e.preventDefault();
      await axios.post("http://localhost:8080/character/create",character);
      navigate("/characters")
    }

  }

  const loadUser = async (id, exists) => {
    if(exists) {
      const result = await axios.get(`http://localhost:8080/character/${id}`, {validateStatus: (status) => status === 302});
      setCharacter(result.data)
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Character</h2>
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
              value={charactersName}
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
              placeholder="Name"
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
              placeholder="Name"
              name="charactersDescription"
              id="description"
              value={charactersDescription}
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
              placeholder="Name"
              name="charactersPictureLink"
              id="picture-link"
              value={charactersPictureLink}
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
              placeholder="Name"
              name="actorsName"
              id="actor-name"
              value={actorsName}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <button type="submit" className="btn btn-outline-primary">
            Submit
          </button>
          <Link to="/characters" className="btn btn-outline-danger mx-2">
            Cancel
          </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CharacterForm;
