import './App.css';
import React from 'react';

const FlashcardsPage = () => {
  return (
    <div>
        <h3>Front of Flashcard</h3>
        <p>Back of Flashcard</p>
    </div>
  );
};


const HomePage = () => {
  return (
    <div className='HomePage'>
      <nav className="Navbar">
        <ul className="NavList">
          <li><a href="">Home</a></li>
          <li><a href="">Flashcards</a></li>
          <li><a href="">Contacts</a></li>
        </ul>
      </nav>
      <div>
        <h2>General Introduction</h2>
        <p>some info</p>
      </div>
      <div>
        <h2>List of Projects</h2>
        <ul>
          <li>
            <h3>Portfolio Website</h3>
            <p>Description of Project 1</p>
            <a href="https://ferayguluzada.github.io/Web-Mobile/" target="_blank"  rel="noreferrer">
              Link to Project
            </a>
          </li>
          <li>
            <h3>Project 2</h3>
            <p>Description of Project 2</p>
            <a href="https://ferayguluzada.github.io/Fetch-API/" target="_blank"  rel="noreferrer" >
              Link to Project
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      
      <HomePage />
    </div>
  );
};

export default App;