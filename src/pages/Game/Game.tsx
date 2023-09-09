import { useCallback, useEffect, useState } from "react";

import { PlayerToken, ScoreCard } from "@/pages/Game/components";
import { PlayerRecord } from "@/pages/Game/types";
import { FaRegCircle, FaXmark } from "react-icons/fa6";
import { TbReload } from "react-icons/tb";

type Players = "NONE" | "X" | "Y";

const PLAYER = Object.freeze({
  NONE: null,
  X: {
    value: 1,
    token: {
      Icon: FaXmark,
      size: 28,
      bgColor: "bg-cyan-300",
      textColor: "text-cyan-300",
    },
  },
  Y: {
    value: -1,
    token: {
      Icon: FaRegCircle,
      size: 20,
      bgColor: "bg-yellow-300",
      textColor: "text-yellow-300",
    },
  },
}) satisfies Readonly<Record<Players, PlayerRecord | null>>;

function Game() {
  const [winner, setWinner] = useState<PlayerRecord | null>(PLAYER.NONE);
  const [scores, setScores] = useState({
    ties: 0,
    xwins: 0,
    owins: 0,
  });

  const [player, setPlayer] = useState<PlayerRecord>(PLAYER.X);
  const [grid, setGrid] = useState<Array<PlayerRecord | null>>(
    Array.from({ length: 9 }, () => PLAYER.NONE)
  );

  useEffect(() => {
    const gridSize = 3;
    let row: number,
      col: number,
      sum: number = 0;

    // Check Horizontal Matches
    for (row = 0; row < gridSize && Math.abs(sum) !== 3; ++row) {
      sum = 0;
      for (col = 0; col < gridSize; ++col) {
        sum += grid[row * gridSize + col]?.value ?? 0;
      }
    }

    // Check Vertical Matches
    for (col = 0; col < gridSize && Math.abs(sum) !== 3; ++col) {
      sum = 0;
      for (row = 0; row < gridSize; ++row) {
        sum += grid[row * gridSize + col]?.value ?? 0;
      }
    }

    // Check Diagonal Matches
    if (Math.abs(sum) !== 3) {
      sum = 0;
      for (row = 0; row < gridSize; ++row) {
        sum += grid[row * gridSize + row]?.value ?? 0;
      }
    }

    if (Math.abs(sum) !== 3) {
      sum = 0;
      for (row = 0; row < gridSize; ++row) {
        sum += grid[row * gridSize + gridSize - row - 1]?.value ?? 0;
      }
    }

    if (sum === 3) {
      setWinner(PLAYER.X);
      setScores((scores) => ({ ...scores, xwins: scores.xwins + 1 }));
    } else if (sum === -3) {
      setWinner(PLAYER.Y);
      setScores((scores) => ({ ...scores, owins: scores.owins + 1 }));
    } else if (grid.every((v) => v !== PLAYER.NONE)) {
      setScores((scores) => ({ ...scores, ties: scores.ties + 1 }));
    }
  }, [grid, setWinner, setScores]);

  const handleGameTileClick = useCallback(
    (idx: number) => {
      setGrid((grid) => {
        grid[idx] = player;
        return [...grid];
      });

      setPlayer((player) => (player === PLAYER.X ? PLAYER.Y : PLAYER.X));
    },
    [player, setPlayer, setGrid]
  );

  const handleGameReset = useCallback(() => {
    setGrid(() => Array.from({ length: 9 }, () => PLAYER.NONE));
    setWinner(PLAYER.NONE);
  }, [setGrid, setWinner]);

  return (
    <main className="flex justify-center items-center w-screen h-screen bg-gray-900">
      <article className="sm:w-[400px] w-[400px] flex flex-col gap-6">
        <header className="flex justify-between">
          <div className="flex items-center">
            <PlayerToken forPlayer={PLAYER.X} isColored />
            <PlayerToken forPlayer={PLAYER.Y} isColored />
          </div>

          <p className="bg-gray-800 text-gray-500 px-4 py-1 text-lg rounded-md font-bold uppercase flex items-center gap-1 shadow-md shadow-gray-800/50">
            <PlayerToken
              forPlayer={player === PLAYER.X ? PLAYER.X : PLAYER.Y}
            />
            Turn
          </p>

          <button
            className="p-3 bg-gray-300 text-gray-800 rounded-md shadow shadow-gray-300/50"
            onClick={handleGameReset}
          >
            <TbReload size={24} />
          </button>
        </header>

        <section className="grid grid-rows-3 grid-cols-3 gap-4 aspect-square">
          {grid.map((owner, i) => (
            <button
              key={i}
              className="flex items-center justify-center rounded-lg bg-gray-800 shadow-lg shadow-gray-800/50"
              onClick={() => handleGameTileClick(i)}
              disabled={owner !== PLAYER.NONE || winner !== PLAYER.NONE}
            >
              {owner !== PLAYER.NONE ? (
                <PlayerToken
                  forPlayer={owner === PLAYER.X ? PLAYER.X : PLAYER.Y}
                  scale={2.75}
                  isColored
                />
              ) : null}
            </button>
          ))}
        </section>

        <footer>
          <ul className="flex gap-4">
            <ScoreCard
              label="X Wins"
              value={scores.xwins}
              className={PLAYER.X.token.bgColor}
            />
            <ScoreCard
              label="Ties"
              value={scores.ties}
              className="bg-gray-300"
            />
            <ScoreCard
              label="O Wins"
              value={scores.owins}
              className={PLAYER.Y.token.bgColor}
            />
          </ul>
        </footer>
      </article>
    </main>
  );
}

export default Game;
