import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import CharacterPage from './pages/CharacterPage/CharacterPage';
import EpisodePage from './pages/EpisodePage/EpisodePage';
import SeasonPage from './pages/SeasonPage/SeasonPage';
import Characters from './pages/Characters/Characters';
import Seasons from './pages/Seasons/Seasons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CharacterForm from './pages/CharacterForm/CharacterForm';
import EpisodeForm from './pages/EpisodeForm/EpisodeForm';
import Episodes from './pages/Episodes/Episodes';
import AddUser from './pages/AddUser';
import Home from './pages/Home';
import SeasonForm from './pages/SeasonForm/SeasonForm';

function App() {

  const [ seasons, setSeasons ] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    loadSeasons();
    loadEpisodes();
    loadCharacters();
  },[])
  
  const loadSeasons = async () =>{
    const result = await axios.get("https://parks-and-rec-123.nw.r.appspot.com/season/all", {validateStatus: (status) => status === 302});
    setSeasons(result.data);
  }

  const loadEpisodes = async () => {
    const result = await axios.get("https://parks-and-rec-123.nw.r.appspot.com/episode/all", {
      validateStatus: (status) => status === 302,
    });
    setEpisodes(result.data);
  };

  const loadCharacters = async () => {
    const result = await axios.get("https://parks-and-rec-123.nw.r.appspot.com/character/all", {
      validateStatus: (status) => status === 302,
    });
    setCharacters(result.data);
  };

  return (
    <Router>
      <div className="app">
        <NavBar seasons={seasons}/>
        <Routes>
          <Route path="/login" element={
            <AddUser />
          }/>
        <Route path="/editcharacter/:id" element={
            <CharacterForm condition={true} seasons={seasons} episodes={episodes}/>
          }/>
          <Route path="/addcharacter/" element={
            <CharacterForm condition={false} seasons={seasons} episodes={episodes}/>
          }/>
          <Route path="/addepisode/" element={
            <EpisodeForm condition={false} seasons={seasons}/>
          }/>
          <Route path="/editepisode/:id" element={
            <EpisodeForm condition={true} seasons={seasons}/>
          }/>
          <Route path="/addseason/" element={
            <SeasonForm condition={false} seasons={seasons}/>
          }/>
          <Route path="/editseason/:id" element={
            <SeasonForm condition={true} seasons={seasons}/>
          }/>

          <Route path="/characters/" element={
            <Characters characters={characters} loadCharacters={loadCharacters}/>
          }/>
          <Route path="/seasons/" element={
            <Seasons />
          }/>
          <Route path="/episodes/" element={
            <Episodes episodes={episodes} loadEpisodes={loadEpisodes}/>
          }/>
          <Route path="/season/:id" element={
            <SeasonPage />
          }/>
          <Route path="/episode/:id" element={
            <EpisodePage />
          }/>
          <Route path="/character/:id" element={
            <CharacterPage />
          }/>
          <Route path="/" element={
            <Home />
          }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
