import './App.css';

import React from 'react';

function Flashcard({ question, answer }) {
  return (
    <div className="flashcard">
      <h2>Question:</h2>
      <p>{question}</p>
      <h2>Answer:</h2>
      <p>{answer}</p>
    </div>
  );
}

function App() {
  const flashcards = [
    { question: 'Question1', answer: 'Answer1' },
    { question: 'Question2', answer: 'Answer2' },
    // Add more flashcards as needed
  ];

  return (
    <div className="App">
      <h1>Flashcards App</h1>
      {flashcards.map((flashcard, index) => (
        <Flashcard
          key={index}
          question={flashcard.question}
          answer={flashcard.answer}
        />
      ))}
    </div>
  );
}


export default App;
