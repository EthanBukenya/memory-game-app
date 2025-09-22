import React, { useState, useEffect } from 'react';
import "./App.css";
import SingleCard from './Components/SingleCard';
import WinModal from './Components/WinModal';

const { cardImages } = require("./imgexp");

export default function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const mixCards = () => {
    const mixedCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ card, id: Math.random(), matched: false }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(mixedCards);
    setTurns(0);
    setGameWon(false);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.card === choiceTwo.card && choiceTwo.id !== choiceOne.id) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.card === choiceOne.card) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
      }
      setTimeout(() => resetTurn(), 1000);
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setGameWon(true);
    }
  }, [cards]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(preTurn => preTurn + 1);
    setDisabled(false);
  };

  useEffect(() => {
    mixCards();
  }, []);

  return (
    <div className='app'>
      <div className="game-header">
        <h1 className="game-title">Memory Game</h1>
        
        <div className="game-stats">
          <div className="stat-item">
            <p className="stat-label">Turns</p>
            <p className="stat-value">{turns}</p>
          </div>
          
          <button 
            className="new-game-btn" 
            onClick={mixCards}
          >
            New Game
          </button>
        </div>
      </div>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            disabled={disabled}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>

      {gameWon && (
        <WinModal 
          turns={turns} 
          onPlayAgain={mixCards} 
        />
      )}
    </div>
  );
}