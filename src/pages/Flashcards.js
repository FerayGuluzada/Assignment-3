import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Flashcards.css';

const FlashcardsPage = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [flippedCard, setFlippedCard] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const statusOptions = ['Want to Learn', 'Noted', 'Learned'];
  const [filterStatus, setFilterStatus] = useState('');
  const [sortOption, setSortOption] = useState('Last Modified');
  const sortOptions = ['Last Modified', 'ID'];
  const [searchText, setSearchText] = useState('');




  const [editContent, setEditContent] = useState({
    id: null,
    question: '',
    answer: '',
    status: 'Want to Learn',
    lastModified: '',
  });

  useEffect(() => {
    fetchData();
  }, [sortOption]);
  
  const sortFlashcards = (unsortedFlashcards) => {
    if (sortOption === 'ID') {
      return unsortedFlashcards.sort((a, b) => a.id - b.id);
    } else if (sortOption === 'Last Modified') {
      return unsortedFlashcards.sort((a, b) => {
        const dateA = new Date(a.lastModified).getTime();
        const dateB = new Date(b.lastModified).getTime();
        return dateB - dateA;
      });
    }
    return unsortedFlashcards;
  };
  
  const fetchData = () => {
    axios
      .get('http://localhost:3000/cards')
      .then((res) => {
        const sortedFlashcards = sortFlashcards(
          res.data.map((questionItem) => ({
            id: questionItem.id,
            question: questionItem.front,
            answer: questionItem.back,
            status: questionItem.status || 'Want to Learn',
            lastModified: questionItem.lastModified || '-',
          }))
        );
        setFlashcards(sortedFlashcards);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredFlashcards = flashcards.filter((flashcard) => {
    const searchTextLower = searchText.toLowerCase();
    const questionLower = flashcard.question.toLowerCase();
    const answerLower = flashcard.answer.toLowerCase();
  
    if (filterStatus === '' || filterStatus === '-') {
      return (
        questionLower.includes(searchTextLower) ||
        answerLower.includes(searchTextLower)
      );
    } else {
      return (
        flashcard.status === filterStatus &&
        (questionLower.includes(searchTextLower) ||
          answerLower.includes(searchTextLower))
      );
    }
  });

  const addCard = () => {
    if (newQuestion && newAnswer) {
      const timestamp = new Date().toLocaleString(); 
      const newCard = {
        front: newQuestion,
        back: newAnswer,
        status: 'Want to Learn', 
        lastModified: timestamp, 
      };

      axios
        .post('http://localhost:3000/cards', newCard)
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

  const deleteCard = (id) => {

    axios
      .delete(`http://localhost:3000/cards/${id}`)
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
    const timestamp = new Date().toLocaleString();
    setEditContent({ id, question, answer, lastModified: timestamp });
  };

  const saveEdit = () => {
    if (editContent.question && editContent.answer) {
      const timestamp = new Date().toLocaleString(); 
      axios
        .put(`http://localhost:3000/cards/${editContent.id}`, {
          front: editContent.question,
          back: editContent.answer,
          status: editContent.status,
          lastModified: timestamp,
        })
        .then((res) => {
          setEditMode(false);
          fetchData();
          setEditContent({ id: null, question: '', answer: '', status: '', lastModified: '' });
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
    setEditContent({ id: null, question: '', answer: '', status: '', lastModified: '' });
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
            <select
              value={editContent.status}
              onChange={(e) =>
                setEditContent({ ...editContent, status: e.target.value })
              }
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button onClick={saveEdit}>Save</button>
            <button onClick={cancelEdit}>Cancel</button>
          </>
        )}
      </div>
      <div>
  <label className='search'>Search Cards: </label>
  <input
    type="text"
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    placeholder="Search by text..."
  />
</div>
      <div>
        <label className = "filter">Filter by Status: </label>
        <select onChange={handleFilterChange} value={filterStatus}>
  <option value="">-</option>
  {statusOptions.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ))}
</select>

      </div>
      <div className="sort">
        
      Sort: <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
  {sortOptions.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ))}
</select>

      </div>
      <div className="flashcard-container">
      {filteredFlashcards.map((flashcard) => (
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
                onClick={() => deleteCard(flashcard.id)}
              >
                Delete
              </button>
              {!editMode && (
                <button
                  className="edit-btn"
                  onClick={() =>
                    toggleEditMode(
                      flashcard.id,
                      flashcard.question,
                      flashcard.answer
                    )
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
