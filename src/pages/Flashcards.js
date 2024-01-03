import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Flashcards.css';

const FlashcardsPage = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [flippedCard, setFlippedCard] = useState(null);
  const [editMode, setEditMode] = useState(false); 
  const [editContent, setEditContent] = useState({ id: null, question: '', answer: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('http://localhost:3001/cards')
      .then((res) => {
        setFlashcards(res.data.map((questionItem) => ({
          id: questionItem.id,
          question: questionItem.front,
          answer: questionItem.back,
          status: questionItem.status || 'Want to Learn', 
          lastModified: questionItem.lastModified || '-', 
        })));
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

  const toggleEditMode = (id, question, answer) => {
    setEditMode(true);
    setEditContent({ id, question, answer });
  };

  const saveEdit = () => {
    if (editContent.question && editContent.answer) {
      axios
        .put(`http://localhost:3001/cards/${editContent.id}`, {
          front: editContent.question,
          back: editContent.answer,
        })
        .then((res) => {
          setEditMode(false);
          fetchData();
          setEditContent({ id: null, question: '', answer: '' });
        })
        .catch((error) => {
          console.error('Error updating card:', error);
        });
    } else {
      alert('Fill in both question and answer fields.');
    }
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEditContent({ id: null, question: '', answer: '' });
  };

  return (
    <div>
      <div className="flashcard-form">
        {!editMode ? (
          <>
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
          </>
        ) : (
          <>
            <input
              type="text"
              value={editContent.question}
              onChange={(e) =>
                setEditContent({ ...editContent, question: e.target.value })
              }
            />
            <input
              type="text"
              value={editContent.answer}
              onChange={(e) =>
                setEditContent({ ...editContent, answer: e.target.value })
              }
            />
            <button onClick={saveEdit}>Save</button>
            <button onClick={cancelEdit}>Cancel</button>
          </>
        )}
      </div>
      <div className="flashcard-container">
        {flashcards.map((flashcard) => (
          <div
            key={flashcard.id}
            className={`flashcard ${
              flippedCard === flashcard.id ? 'flipped' : ''
            }`}
            onClick={() => handleCardClick(flashcard.id)}
          >
            <div className="front">
              <button
                className="delete-btn"
                onClick={(e) => deleteCard(flashcard.id, e)}
              >
                Delete
              </button>
              {!editMode && (
                <button
                  className="edit-btn"
                  onClick={() =>
                    toggleEditMode(flashcard.id, flashcard.question, flashcard.answer)
                  }
                >
                  Edit
                </button>
              )}
              <h3>{flashcard.question}</h3>
              <div className="card-details">
                <p>Status: {flashcard.status}</p>
                <p>Last Modified: {flashcard.lastModified}</p>
              </div>
            </div>
            <div className="back">
              <p>Answer: {flashcard.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashcardsPage;