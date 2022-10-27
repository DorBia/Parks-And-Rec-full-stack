import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeletePrompt from "../../components/DeletePrompt/DeletePrompt";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

const SeasonPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [season, setSeason] = useState([]);
  const [show, setShow] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    loadSeason(id);
  }, [id]);

  const loadSeason = async (id) => {
    const result = await axios.get(`https://parks-and-rec-123.nw.r.appspot.com/season/${id}`, {
      validateStatus: (status) => status === 302,
    });
    setSeason(result.data);
    setLoading(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteSeason = async (id) => {
    await axios.delete(`https://parks-and-rec-123.nw.r.appspot.com/season/${id}`);
    navigate("/");
  };

  return (
    <div className="container py-4">
      {loading && <LoadingScreen />}
      {!loading && (
        <div className="border rounded p-4 mt-2 shadow">
          <div className="row text-center">
            <div className="mx-2">
              <h2 className="text-center display-3">
                Season {season.seasonsNumber}
              </h2>
              <img
                src={season.seasonsPicture}
                alt={season.seasonsNumber}
                className="shadow rounded img-fluid img-edit my-4"
              />

              <p>{season.seasonsDescription}</p>
            </div>

            <div className="row justify-content-center mt-3">
              <Link
                to={`/editseason/${season?.id}`}
                className="btn btn-outline-dark mx-2 col-3 col-md-2 p-3"
              >
                Edit
              </Link>
              <Button
                className="mx-2 col-3 col-md-2 p-3"
                variant="outline-danger"
                onClick={handleShow}
              >
                Delete
              </Button>
            </div>
            <DeletePrompt show={show} handleClose={handleClose} handleDelete={deleteSeason} id={season.id} name="season"/>
          </div>
          <Button
              variant="dark"
              className="btn py-2 px-3"
              onClick={() => navigate("/")}
            >
              ⇦
            </Button>
        </div>
      )}
    </div>
  );
};
export default SeasonPage;
