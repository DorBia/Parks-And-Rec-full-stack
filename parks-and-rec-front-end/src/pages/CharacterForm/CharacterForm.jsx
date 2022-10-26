import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputBar from "../../components/InputBar/InputBar";
import CollapseCheckbox from "../../components/CollapseCheckbox/CollapseCheckbox";
import ButtonsBottomRow from "../../components/ButtonsBottomRow/ButtonsBottomRow";
import TextArea from "../../components/TextArea/TextArea";

const CharacterForm = ({ condition, seasons, episodes }) => {
  let navigate = useNavigate();

  const { id } = useParams();
  const [seasonArr, setSeasonArr] = useState([]);
  const [episodeArr, setEpisodeArr] = useState([]);
  const [openSeasons, setOpenSeasons] = useState(false);
  const [openEpisodes, setOpenEpisodes] = useState(false);

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
                                                 
  const onInputChange = (e) => setCharacter({ ...character, [e.target.name]: e.target.value });

  useEffect(() => {
    loadCharacter(id, condition);
  }, [id, condition]);

  const onSubmit = async (e, exists) => {
    e.preventDefault();
    if (exists) {
      await axios.put(`https://parks-and-rec-123.nw.r.appspot.com/character/${id}`, character);
      navigate(`/character/${id}`);
    } else {
      await axios.post("https://parks-and-rec-123.nw.r.appspot.com/character/create", character);
      navigate("/characters");
    }
  };

  const loadCharacter = async (id, exists) => {
    if (exists) {
      const result = await axios.get(`https://parks-and-rec-123.nw.r.appspot.com/character/${id}`, {
        validateStatus: (status) => status === 302,
      });
      setCharacter(result.data);
      setSeasonArr(result.data.seasonsCharacter);
      setEpisodeArr(result.data.episodesCharacter);
    }
  };

  const addOrRemoveSeasons = (newSeason) => {
    seasonArr?.some((s) => s.id === newSeason.id)
      ? setSeasonArr(seasonArr?.filter((season) => season.id !== newSeason.id))
      : setSeasonArr([...seasonArr, newSeason]);
  };

  const addOrRemoveEpisodes = (newEpisode) => {
    episodeArr?.some((e) => e.id === newEpisode.id)
      ? setEpisodeArr(
          episodeArr?.filter((episode) => episode.id !== newEpisode.id)
        )
      : setEpisodeArr([...episodeArr, newEpisode]);
  };

  const handleClick = (setOpenFalse, setOpen, open, condition) => {
    setOpenFalse(false);
    setOpen(!open);
    if (condition) {
      setCharacter({ ...character, seasonsCharacter: seasonArr });
    }
  };

  const setAll = () => {
    setCharacter({
      ...character,
      episodesCharacter: episodeArr,
      seasonsCharacter: seasonArr,
    });
  };

  const seasonsJSX = seasons?.map((season) => {
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
  });

  const episodesJSX = episodes?.map((episode) => {
    if (
      seasonArr?.some(
        (s) =>
          episode.seasonsEpisode.id === s.id || s.id === episode.seasonsEpisode
      )
    ) {
      return (
        <div key={`episode${episode.id}`} className="col">
          <label className="mx-1">
            {episode.episodesName}{" "}
            <input
              type="checkbox"
              checked={episodeArr?.some((e) => e.id === episode.id) || false}
              id={`episode${episode.id}`}
              defaultValue={episode || ""}
              onChange={() => addOrRemoveEpisodes(episode)}
            />
          </label>
        </div>
      );
    }
    return null;
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 border rounded p-4 mt-5 shadow">
          {condition && <h2 className="text-center m-4">Edit Character</h2>}
          {!condition && <h2 className="text-center m-4">Add Character</h2>}
          <form onSubmit={(e) => onSubmit(e, condition)}>
            <InputBar
              type="text"
              placeholder="Name"
              name="charactersName"
              id="name"
              value={charactersName}
              onInputChange={onInputChange}
              required={true}
            />
            <InputBar
              type="number"
              placeholder="Age"
              name="age"
              id="age"
              value={age}
              onInputChange={onInputChange}
            />
            <TextArea
              name="charactersDescription"
              value={charactersDescription}
              onInputChange={onInputChange}
            />
            <InputBar
              type="text"
              placeholder="Picture's link"
              name="charactersPictureLink"
              id="picture-link"
              value={charactersPictureLink}
              onInputChange={onInputChange}
            />
            <InputBar
              type="text"
              placeholder="Actor's name"
              name="actorsName"
              id="actor-name"
              value={actorsName}
              onInputChange={onInputChange}
              required={true}
            />
            <CollapseCheckbox
              handleClick={handleClick}
              setOpenFalse={setOpenEpisodes}
              setOpen={setOpenSeasons}
              open={openSeasons}
              data={seasonsJSX}
              condition={false}
              text={"Choose Seasons"}
            />
            <CollapseCheckbox
              handleClick={handleClick}
              setOpenFalse={setOpenSeasons}
              setOpen={setOpenEpisodes}
              open={openEpisodes}
              data={episodesJSX}
              condition={true}
              text={"Choose Episodes"}
            />
            <ButtonsBottomRow
              destination="/episodes"
              setAll={setAll}
              condition={true}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CharacterForm;
