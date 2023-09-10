import { PlayerRecord } from "@/pages/Game/types";
import PlayerToken from "./PlayerToken";

interface GameTileProps {
  onClick: () => void;
  disabled?: boolean;
  pressedBy?: PlayerRecord | null;
}

function GameTile({ onClick, disabled, pressedBy }: GameTileProps) {
  return (
    <button
      className="flex items-center justify-center rounded-lg bg-gray-800 shadow-lg shadow-gray-800/50 p-8"
      onClick={onClick}
      disabled={disabled}
    >
      {pressedBy && (
        <PlayerToken
          forPlayer={pressedBy}
          isColored
          className="w-full h-full"
        />
      )}
    </button>
  );
}

export default GameTile;
