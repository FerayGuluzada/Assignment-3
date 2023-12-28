import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className='HomePage'>
      <div>
        <h2>General Introduction</h2>
        <p>some info</p>
      </div>
      <div>
        <h2>List of Projects</h2>
        <ul>
          <li className="project">
            <a href="https://ferayguluzada.github.io/Web-Mobile/" target="_blank" rel="noreferrer">
              <div className="projectContent">
                <h3>Project 1</h3>
                <p>Description of Project 1</p>
              </div>
            </a>
          </li>
          <li className="project">
            <a href="https://ferayguluzada.github.io/Fetch-API/" target="_blank" rel="noreferrer">
              <div className="projectContent">
                <h3>Project 2</h3>
                <p>Description of Project 2</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
