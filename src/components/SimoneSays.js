import ColorCard from "./ColorCard";
import React, { useState, useEffect } from "react";
import GameButton from "./GameButton";

function SimoneSays() {
  const colorList = ["green", "red", "blue", "yellow"];
  const initPlay = {
    isDisplay: false,
    colors: [],
    score: 0,
    userPlay: false,
    userColors: [],
  };
  const [isOn, setIsOn] = useState(false);
  const [play, setPlay] = useState(initPlay);

  useEffect(() => {
    if (isOn) {
      setPlay({ ...initPlay, isDisplay: true });
    } else {
      setPlay(initPlay);
    }
  }, [isOn]);

  function startHandle() {
    setIsOn(true);
  }
  return (
    <div className="gameWrapper">
      <div className="cardWrapper">
        {colorList &&
          colorList.map((color, ind) => (
            <ColorCard key={ind} color={color}></ColorCard>
          ))}
      </div>

      <GameButton
        showStartButton={!isOn && !play.score}
        showScore={isOn && (play.isDisplay || play.userPlay)}
        score={play.score}
        onStartClick={startHandle}
      ></GameButton>
    </div>
  );
}

export default SimoneSays;
