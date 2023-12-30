import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FlashcardsPage from './pages/Flashcards';
import Contacts from './pages/Contacts';


const App = () => {
  return (
    <BrowserRouter>
      <div>
        <nav className="Navbar">
          <ul className="NavList">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/flashcards">Flashcards</Link></li>
            <li><Link to="/contacts">Contacts</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;