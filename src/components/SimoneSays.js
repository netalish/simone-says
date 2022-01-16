import ColorCard from "./ColorCard";
import React from "react";

function SimoneSays() {
  return (
    <div className="gameWrapper">
      <ColorCard color="green"></ColorCard>
      <ColorCard color="red"></ColorCard>
      <ColorCard color="blue"></ColorCard>
      <ColorCard color="yellow"></ColorCard>
    </div>
  );
}

export default SimoneSays;
