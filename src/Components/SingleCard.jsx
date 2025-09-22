import React from 'react';
import "./SingleCard.css";
import back2 from "../Assets/back2.png";
import a from "../Assets/a.mp3";

export default function SingleCard({ card, handleChoice, disabled, flipped }) {
  const pla = () => {
    try {
      const audio = new Audio(a);
      audio.play().catch(e => console.log('Audio play failed:', e));
    } catch (error) {
      console.log('Audio error:', error);
    }
  };

  const clickHandle = () => {
    if (!disabled) {
      pla();
      handleChoice(card);
    }
  };

  return (
    <div className="card" onClick={clickHandle}>
      <div className={`card-inner ${flipped ? 'flipped' : ''}`}>
        <div className="card-front">
          {/* Use your actual card image here */}
          <img className="card-image" src={card.card} alt="Front_Image" />
        </div>
        <div className="card-back">
          <img className="card-back-image" src={back2} alt="Back_Image" />
          <div className="card-pattern"></div>
        </div>
      </div>
    </div>
  );
}
