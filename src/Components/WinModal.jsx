import React from 'react';
import "./WinModal.css";

export default function WinModal({ turns, onPlayAgain }) {
  return (
    <div className="game-won">
      <div className="win-modal">
        <h2 className="win-title">🎉 Congratulations!</h2>
        <p className="win-message">
          You completed the game in {turns} turns!
        </p>
        <div className="win-actions">
          <button 
            className="play-again-btn" 
            onClick={onPlayAgain}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}