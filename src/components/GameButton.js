function GameButton({ isOn, onClick }) {
  return (
    <button onClick={onClick} className="gameButton">
      Start
    </button>
  );
}

export default GameButton;
