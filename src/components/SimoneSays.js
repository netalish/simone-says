import ColorCard from "./ColorCard";
import React, { useState } from "react";
import GameButton from "./GameButton";

function SimoneSays() {
  const [isOn, setIsOn] = useState(false);
  function startHandle() {
    setIsOn(true);
  }
  return (
    <div className="gameWrapper">
      <div className="cardWrapper">
        <ColorCard color="green"></ColorCard>
        <ColorCard color="red"></ColorCard>
        <ColorCard color="blue"></ColorCard>
        <ColorCard color="yellow"></ColorCard>
      </div>
      <GameButton isOn={isOn} onClick={startHandle}></GameButton>
    </div>
  );
}

export default SimoneSays;
