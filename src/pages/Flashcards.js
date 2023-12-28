import React from 'react';
import './Flashcards.css'; 

const FlashcardsPage = () => {
  return (
    <div className="flashcard">
      <div className="front">
        <h3>Front of Flashcard</h3>
      </div>
      <div className="back">
        <p>Back of Flashcard</p>
      </div>
    </div>
  );
};

export default FlashcardsPage;
