import './App.css';
import React from 'react';

const HomePage = () => {
  return (
    <div>
      <h1>Flashcardsssss App</h1>
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