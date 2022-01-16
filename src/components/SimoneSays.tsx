import ColorCard from "./ColorCard";
import { useState, useEffect } from "react";
import * as React from "react";
import GameButton from "./GameButton";
import timeout from "../utils/utils";

function SimoneSays() {
  const [flashColor, setFlashColor] = useState("");
  const colorList = ["green", "red", "blue", "yellow"];
  const initPlay = {
    isDisplay: false,
    colors: [] as string[],
    score: 0,
    userPlay: false,
    userColors: [] as string[],
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

  useEffect(() => {
    if (isOn && play.isDisplay) {
      let newColor = colorList[Math.floor(Math.random() * 4)];
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

  async function cardClickHandle(color: string) {
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

  function closeHandle() {
    setIsOn(false);
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
        gameLost={isOn && !play.isDisplay && !play.userPlay && !!play.score}
        onStartClick={startHandle}
        OnCloseClick={closeHandle}
      ></GameButton>
    </div>
  );
}

export default SimoneSays;
