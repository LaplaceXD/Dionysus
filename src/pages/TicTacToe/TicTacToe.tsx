import { useCallback, useEffect, useState } from "react";
import { FaRegCircle, FaXmark } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { TbReload } from "react-icons/tb";

import { GameTile, PlayerToken, ScoreCard } from "@/pages/TicTacToe/components";
import { PlayerRecord } from "@/pages/TicTacToe/types";
import clsx from "clsx";
import { Link } from "react-router-dom";

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

const GRID_SIZE = 3;

function TicTacToe() {
  const [winner, setWinner] = useState<PlayerRecord | null>(PLAYER.NONE);
  const [scores, setScores] = useState({
    ties: 0,
    xwins: 0,
    owins: 0,
  });

  const [player, setPlayer] = useState<PlayerRecord>(PLAYER.X);
  const [matchedIdxs, setMatchedIdxs] = useState<Array<number>>([]);
  const [grid, setGrid] = useState<Array<PlayerRecord | null>>(
    Array.from({ length: GRID_SIZE ** 2 }, () => PLAYER.NONE)
  );
  const isTie = grid.every((v) => v !== PLAYER.NONE);

  useEffect(() => {
    let row: number,
      col: number,
      sum: number = 0,
      matchedIdxs: Array<number> = [];

    // Check Horizontal Matches
    for (row = 0; row < GRID_SIZE && Math.abs(sum) !== 3; ++row) {
      sum = 0;
      matchedIdxs = [];

      for (col = 0; col < GRID_SIZE; ++col) {
        matchedIdxs.push(row * GRID_SIZE + col);
        sum += grid[matchedIdxs[matchedIdxs.length - 1]!]?.value ?? 0;
      }
    }

    // Check Vertical Matches
    for (col = 0; col < GRID_SIZE && Math.abs(sum) !== 3; ++col) {
      sum = 0;
      matchedIdxs = [];

      for (row = 0; row < GRID_SIZE; ++row) {
        matchedIdxs.push(row * GRID_SIZE + col);
        sum += grid[matchedIdxs[matchedIdxs.length - 1]!]?.value ?? 0;
      }
    }

    // Check Diagonal Matches
    if (Math.abs(sum) !== 3) {
      sum = 0;
      matchedIdxs = [];

      for (row = 0; row < GRID_SIZE; ++row) {
        matchedIdxs.push(row * GRID_SIZE + row);
        sum += grid[matchedIdxs[matchedIdxs.length - 1]!]?.value ?? 0;
      }
    }

    if (Math.abs(sum) !== 3) {
      sum = 0;
      matchedIdxs = [];

      for (row = 0; row < GRID_SIZE; ++row) {
        matchedIdxs.push(row * GRID_SIZE + GRID_SIZE - row - 1);
        sum += grid[matchedIdxs[matchedIdxs.length - 1]!]?.value ?? 0;
      }
    }

    if (sum === 3) {
      setWinner(PLAYER.X);
      setScores((scores) => ({ ...scores, xwins: scores.xwins + 1 }));
      setMatchedIdxs(matchedIdxs);
    } else if (sum === -3) {
      setWinner(PLAYER.Y);
      setScores((scores) => ({ ...scores, owins: scores.owins + 1 }));
      setMatchedIdxs(matchedIdxs);
    } else if (isTie) {
      setScores((scores) => ({ ...scores, ties: scores.ties + 1 }));
    }
  }, [grid, setWinner, setScores, isTie]);

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
    setGrid(() => Array.from({ length: GRID_SIZE ** 2 }, () => PLAYER.NONE));
    setWinner(PLAYER.NONE);
    setMatchedIdxs([]);
  }, [setGrid, setWinner]);

  return (
    <main className="flex justify-center items-center min-h-screen">
      <article className="sm:w-[624px] w-[400px] flex flex-col gap-6">
        <header className="flex flex-col gap-4">
          <h1 className="font-bold text-center text-6xl">
            <span className={PLAYER.X.token.textColor}>Tic</span>
            <span className="text-gray-300">Tac</span>
            <span className={PLAYER.Y.token.textColor}>Toe</span>
          </h1>

          <section className="flex justify-between">
            <div className="flex flex-1 items-center">
              <PlayerToken forPlayer={PLAYER.X} isColored />
              <PlayerToken forPlayer={PLAYER.Y} isColored />
            </div>

            <p
              className={clsx(
                "flex-1 justify-center bg-gray-800 px-4 py-1 sm:text-2xl sm:gap-2 gap-1 text-lg rounded-md font-bold uppercase flex items-center shadow-md shadow-gray-800/50",
                winner === PLAYER.NONE && isTie
                  ? "text-gray-300"
                  : winner === PLAYER.NONE
                  ? "text-gray-500"
                  : winner.token.textColor
              )}
            >
              {winner === PLAYER.NONE && isTie ? (
                "Tie"
              ) : winner === PLAYER.NONE ? (
                <>
                  <PlayerToken forPlayer={player} />
                  Turn
                </>
              ) : (
                <>
                  <PlayerToken forPlayer={winner} />
                  Wins
                </>
              )}
            </p>

            <menu className="flex flex-1 justify-end gap-2">
              <li>
                <button
                  className="p-3 bg-gray-400 text-gray-800 rounded-md shadow shadow-gray-400/50 hover:bg-white transition-colors duration-200"
                  onClick={handleGameReset}
                >
                  <TbReload size={24} />
                </button>
              </li>
              <li>
                <Link
                  to="/"
                  className="block p-3 bg-gray-400 text-gray-800 rounded-md shadow shadow-gray-400/50 hover:bg-white transition-colors duration-200"
                >
                  <GoHome size={24} />
                </Link>
              </li>
            </menu>
          </section>
        </header>

        <section className="grid grid-rows-3 grid-cols-3 gap-4 aspect-square">
          {grid.map((pressedBy, i) => (
            <GameTile
              key={i}
              onClick={() => handleGameTileClick(i)}
              disabled={pressedBy !== PLAYER.NONE || winner !== PLAYER.NONE}
              pressedBy={pressedBy}
              isInverted={matchedIdxs.includes(i)}
            />
          ))}
        </section>

        <footer className="flex flex-col gap-8">
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

export default TicTacToe;
