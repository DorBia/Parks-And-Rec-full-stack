import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const SeasonPage = () => {
  const { id } = useParams();

  const [season, setSeason] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    loadSeason(id);
  }, [id]);

  const loadSeason = async (id) => {
    const result = await axios.get(`http://localhost:8080/season/${id}`, {
      validateStatus: (status) => status === 302,
    });
    setSeason(result.data);
  };

  const deleteSeason = async (id) => {
    await axios.delete(`http://localhost:8080/season/${id}`);
    navigate("/");
  };

    return (
      <div className="container py-4">
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
                  to={`/editepisode/${season?.id}`}
                  className="btn btn-outline-dark mx-2 col-3 col-md-2 p-3"
                >
                  Edit
                </Link>
                <Button
                  className="mx-2 col-3 col-md-2 p-3"
                  variant="outline-danger"
                  onClick={() => deleteSeason(season.id)}
                >
                  Delete
                </Button>
              </div>
              <Button
          variant="dark"
          className="btn py-2 px-3col-2 col-md-1"
          onClick={() => navigate("/episodes")}
        >
          ⇦
        </Button>

            </div>
          </div>
        </div>
  )};
export default SeasonPage;
  
