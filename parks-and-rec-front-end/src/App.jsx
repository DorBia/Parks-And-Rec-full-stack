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

function App() {

  const [ seasons, setSeasons ] = useState([]);

  useEffect(() => {
    loadSeasons();
  },[])
  
  const loadSeasons = async () =>{
    const result = await axios.get("http://localhost:8080/season/all", {validateStatus: (status) => status === 302});
    setSeasons(result.data);
  }

  return (
    <Router>
      <div className="app">
        <NavBar seasons={seasons}/>
        <Routes>
          <Route path="/login" element={
            <AddUser />
          }/>
        <Route path="/editcharacter/:id" element={
            <CharacterForm condition={true} seasons={seasons}/>
          }/>
          <Route path="/addcharacter/" element={
            <CharacterForm condition={false}/>
          }/>
          <Route path="/addepisode/" element={
            <EpisodeForm condition={false} seasons={seasons}/>
          }/>
          <Route path="/editepisode/:id" element={
            <EpisodeForm condition={true} seasons={seasons}/>
          }/>
          <Route path="/characters/" element={
            <Characters />
          }/>
          <Route path="/seasons/" element={
            <Seasons />
          }/>
          <Route path="/episodes/" element={
            <Episodes />
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
