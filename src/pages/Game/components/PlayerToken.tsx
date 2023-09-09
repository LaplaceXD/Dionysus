import { PlayerRecord } from "@/pages/Game/types";
import clsx from "clsx";

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
      className={clsx(isColored && `text-${forPlayer.token.color}`, className)}
    />
  );
}

export default PlayerToken;
