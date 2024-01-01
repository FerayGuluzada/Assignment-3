import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Flashcards.css';
const FlashcardsPage = () => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/cards')
      .then((res) => {
        const transformedData = res.data.map((questionItem, index) => ({
          id: `${index}-${Date.now()}`,
          question: questionItem.front,
          answer: questionItem.back,
        }));
        setFlashcards(transformedData); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="flashcard-container"> {}
      {flashcards.map((flashcard) => (
        <div key={flashcard.id} className="flashcard">
          <div className="front">
            <h3>{flashcard.question}</h3>
          </div>
          <div className="back">
            <p>Answer: {flashcard.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlashcardsPage;