import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import CharacterPage from './pages/CharacterPage/CharacterPage';
import EpisodePage from './pages/EpisodePage/EpisodePage';
import SeasonPage from './pages/SeasonPage/SeasonPage';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <Routes>
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
