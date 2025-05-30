import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './components/Home';
import Activity1 from './components/Actividad1';
import Activity2 from './components/Actividad2';
import Activity3 from './components/Actividad3';
import Activity4 from './components/Actividad4';
import Activity5 from './components/Actividad5';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <h1>Portafolio</h1>
          <ul className="nav-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/Activity1">Actividad 1</Link></li>
            <li><Link to="/Activity2">Actividad 2</Link></li>
            <li><Link to="/Activity3">Actividad 3</Link></li>
            <li><Link to="/Activity4">Actividad 4</Link></li>
            <li><Link to="/Activity5">Actividad 5</Link></li>
          </ul>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Activity1" element={<Activity1 />} />
            <Route path="/Activity2" element={<Activity2 />} />
            <Route path="/Activity3" element={<Activity3 />} />
            <Route path="/Activity4" element={<Activity4 />} />
            <Route path="/Activity5" element={<Activity5 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
