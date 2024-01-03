import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Flashcards.css';

const FlashcardsPage = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [flippedCard, setFlippedCard] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('http://localhost:3001/cards')
      .then((res) => {
        const transformedData = res.data.map((questionItem, index) => ({
          id: `${index}`,
          question: questionItem.front,
          answer: questionItem.back,
        }));
        setFlashcards(transformedData);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const addCard = () => {
    if (newQuestion && newAnswer) {
      const newCard = {
        front: newQuestion,
        back: newAnswer,
      };

      axios
        .post('http://localhost:3001/cards', newCard)
        .then((res) => {
          fetchData();
          setNewQuestion('');
          setNewAnswer('');
        })
        .catch((error) => {
          console.error('Error adding card:', error);
        });
    } else {
      alert('Fill in both question and answer fields.');
    }
  };

  const deleteCard = (id, e) => {
    e.stopPropagation(); 
  
    axios
      .delete(`http://localhost:3001/cards/${id}`)
      .then((res) => {
        fetchData();
      })
      .catch((error) => {
        console.error('Error deleting card:', error);
      });
  };

  const handleCardClick = (id) => {
    setFlippedCard(id === flippedCard ? null : id);
  };

  return (
    <div>
      <div className="flashcard-form">
        <input
          type="text"
          placeholder="Question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Answer"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />
        <button onClick={addCard}>Add Card</button>
      </div>
      <div className="flashcard-container">
        {flashcards.map((flashcard) => (
          <div
            key={flashcard.id}
            className={`flashcard ${flippedCard === flashcard.id ? 'flipped' : ''}`}
            onClick={() => handleCardClick(flashcard.id)}
          >
            <div className="front">
              <h3>{flashcard.question}</h3>
            </div>
            <div className="back">
              <p>Answer: {flashcard.answer}</p>
              <button onClick={(e) => deleteCard(flashcard.id, e)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashcardsPage;
