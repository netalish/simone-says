import * as React from "react";

interface props {
  showStartButton: boolean;
  showScore: boolean;
  score: number;
  gameLost: boolean;
  onStartClick: () => void;
  OnCloseClick: () => void;
}
function GameButton({
  showStartButton,
  showScore,
  score,
  gameLost,
  onStartClick,
  OnCloseClick,
}: props) {
  return (
    <div className="gameButtonWrapper">
      {showStartButton && (
        <button onClick={onStartClick} className="gameButton">
          Start
        </button>
      )}
      {showScore && <div className="score">{score}</div>}
      {gameLost && (
        <div className="lost">
          <div>Final score: {score}</div>
          <button onClick={OnCloseClick}>Close</button>
        </div>
      )}
    </div>
  );
}

export default GameButton;
