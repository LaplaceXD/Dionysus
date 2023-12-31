import clsx from "clsx";

import { PlayerRecord } from "@/pages/TicTacToe/types";

interface PlayerTokenProps {
  forPlayer: PlayerRecord;
  scale?: number;
  isColored?: boolean;
  className?: string;
}

function PlayerToken({
  forPlayer,
  className,
  scale = 1,
  isColored = false,
}: PlayerTokenProps) {
  return (
    <forPlayer.token.Icon
      size={forPlayer.token.size * scale}
      className={clsx(
        isColored && forPlayer.token.textColor,
        "duation-300 transition-colors",
        className
      )}
    />
  );
}

export default PlayerToken;
