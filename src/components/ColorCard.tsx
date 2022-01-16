import * as React from "react";
function ColorCard({
  color,
  onClick,
  flash,
}: {
  color: string;
  onClick: () => void;
  flash: boolean;
}): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={`colorCard ${color} ${flash ? "flash" : ""}`}
    ></div>
  );
}

export default ColorCard;
