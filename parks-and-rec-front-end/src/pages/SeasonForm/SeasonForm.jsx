import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonsBottomRow from "../../components/ButtonsBottomRow/ButtonsBottomRow";
import InputBar from "../../components/InputBar/InputBar";
import TextArea from "../../components/TextArea/TextArea";

const SeasonForm = ({ condition, seasons }) => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [season, setSeason] = useState({
    seasonsNumber: 0,
    seasonsDescription: "",
    seasonsPicture: "",
  });

  const {
    seasonsNumber,
    seasonsDescription,
    seasonsPicture,
  } = season;

  const onInputChange = (e) =>
    setSeason({ ...season, [e.target.name]: e.target.value });

  useEffect(() => {
    loadSeason(id, condition);
  }, [id, condition]);

  const onSubmit = async (e, exists) => {
    e.preventDefault();
    if (exists) {
      await axios.put(`https://parks-and-rec-123.nw.r.appspot.com/season/${id}`, season);
      navigate(`/season/${id}`);
    } else {
      await axios.post("https://parks-and-rec-123.nw.r.appspot.com/season/create", season);
      navigate("/seasons");
    }
  };

  const loadSeason = async (id, exists) => {
    if (exists) {
      const result = await axios.get(`https://parks-and-rec-123.nw.r.appspot.com/season/${id}`, {
        validateStatus: (status) => status === 302,
      });
      setSeason(result.data);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 border rounded p-4 mt-5 shadow">
          {condition && <h2 className="text-center m-4">Edit Season</h2>}
          {!condition && <h2 className="text-center m-4">Add Season</h2>}
          <form onSubmit={(e) => onSubmit(e, condition)}>
            <InputBar
              type="number"
              placeholder="Number"
              name="seasonsNumber"
              id="number"
              value={seasonsNumber}
              onInputChange={onInputChange}
              required={true}
            />
            <TextArea
              name="seasonsDescription"
              value={seasonsDescription}
              onInputChange={onInputChange}
            />
            <InputBar
              type="text"
              placeholder="Picture's Link"
              name="seasonsPicture"
              id="picture"
              value={seasonsPicture}
              onInputChange={onInputChange}
              required={false}
            />
            <ButtonsBottomRow destination="/seasons" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SeasonForm;
