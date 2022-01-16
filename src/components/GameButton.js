function GameButton({ showStartButton, showScore, score, onStartClick }) {
  return (
    <div className="gameButtonWrapper">
      {showStartButton && (
        <button onClick={onStartClick} className="gameButton">
          Start
        </button>
      )}
      {showScore && <div className="score">{score}</div>}
    </div>
  );
}

export default GameButton;
