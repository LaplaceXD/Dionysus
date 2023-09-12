import clsx from "clsx";

import { PlayerRecord } from "@/pages/TicTacToe/types";
import PlayerToken from "./PlayerToken";

interface GameTileProps {
  onClick: () => void;
  disabled?: boolean;
  isInverted?: boolean;
  pressedBy?: PlayerRecord | null;
}

function GameTile({
  onClick,
  pressedBy,
  disabled = false,
  isInverted = false,
}: GameTileProps) {
  return (
    <button
      className={clsx(
        "flex items-center justify-center rounded-lg p-8 transition-colors duration-300",
        isInverted
          ? pressedBy?.token.bgColor
          : "bg-gray-800 shadow-lg shadow-gray-800/50"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {pressedBy && (
        <PlayerToken
          forPlayer={pressedBy}
          isColored={!isInverted}
          className="w-full h-full"
        />
      )}
    </button>
  );
}

export default GameTile;
