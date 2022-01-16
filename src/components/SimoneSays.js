import ColorCard from "./ColorCard";
import React, { useState, useEffect } from "react";
import GameButton from "./GameButton";
import timeout from "../utils/utils";

function SimoneSays() {
  const [flashColor, setFlashColor] = useState("");
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
      //console.log("isOn", isOn);
    } else {
      setPlay(initPlay);
    }
  }, [isOn]);

  useEffect(() => {
    if (isOn && play.isDisplay) {
      let newColor = colorList[Math.floor(Math.random() * 4)];
      console.log(newColor);
      const copyColors = [...play.colors];
      copyColors.push(newColor);
      setPlay({ ...play, colors: copyColors });
    }
  }, [isOn, play.isDisplay]);

  useEffect(() => {
    if (isOn && play.isDisplay && play.colors.length) {
      flashColors();
    }
  }, [isOn, play.isDisplay, play.colors.length]);

  async function flashColors() {
    console.log("play colors", play.colors);
    await timeout(1000);
    const len = play.colors.length;
    for (let i = 0; i < len; i++) {
      setFlashColor(play.colors[i]);
      await timeout(1000);
      setFlashColor("");
      await timeout(1000);

      // last color - prepare for user to start play
      if (i === play.colors.length - 1) {
        const copyColors = [...play.colors];
        setPlay({
          ...play,
          isDisplay: false,
          userPlay: true,
          userColors: copyColors.reverse(),
        });
      }
    }
  }

  function startHandle() {
    setIsOn(true);
  }

  async function cardClickHandle(color) {
    if (!play.isDisplay && play.userPlay) {
      const copyUserColors = [...play.userColors];
      const lastColor = copyUserColors.pop();
      setFlashColor(color);

      if (lastColor === color) {
        if (copyUserColors.length) {
          setPlay({ ...play, userColors: copyUserColors });
        } else {
          //last color - move to the next level
          await timeout(1000);
          setPlay({
            ...play,
            isDisplay: true,
            userPlay: false,
            score: play.colors.length,
            userColors: [],
          });
        }
      } else {
        // fail the game
        await timeout(1000);
        setPlay({ ...initPlay, score: play.colors.length });
      }
      await timeout(1000);
      setFlashColor("");
    }
  }

  return (
    <div className="gameWrapper">
      <div className="cardWrapper">
        {colorList &&
          colorList.map((color, ind) => (
            <ColorCard
              key={ind}
              color={color}
              flash={flashColor === color}
              onClick={() => cardClickHandle(color)}
            ></ColorCard>
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
