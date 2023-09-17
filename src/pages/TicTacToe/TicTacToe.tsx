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
      bgColor: "bg-secondary-400",
      textColor: "text-secondary-400",
    },
  },
  Y: {
    value: -1,
    token: {
      Icon: FaRegCircle,
      size: 20,
      bgColor: "bg-primary-500",
      textColor: "text-primary-500",
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
    <div className="wrapper mt-8 flex flex-col items-center justify-center gap-8 pb-8 md:mt-24 md:flex-row md:gap-16 md:pb-24">
      <aside className="flex w-full max-w-[400px] flex-1 flex-col gap-6 md:max-w-[512px] lg:max-w-[628px]">
        <header className="flex justify-center gap-4">
          <div className="flex flex-1 items-center">
            <PlayerToken forPlayer={PLAYER.X} isColored />
            <PlayerToken forPlayer={PLAYER.Y} isColored />
          </div>

          <p
            className={clsx(
              "flex flex-1 items-center justify-center gap-1 rounded-md bg-neutral-800 px-4 py-1 text-lg font-bold uppercase shadow-md shadow-neutral-800/50 sm:gap-2 sm:text-2xl",
              winner === PLAYER.NONE && isTie
                ? "text-neutral-300"
                : winner === PLAYER.NONE
                ? "text-neutral-500"
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

          <menu className="flex flex-1 justify-end gap-1 sm:gap-2">
            <li>
              <button
                className="rounded-md bg-neutral-300 p-3 text-neutral-800 shadow shadow-neutral-400/50 transition-colors duration-200 hover:bg-white"
                onClick={handleGameReset}
              >
                <TbReload size={24} />
              </button>
            </li>
            <li>
              <Link
                to="/"
                className="block rounded-md bg-neutral-300 p-3 text-neutral-800 shadow shadow-neutral-400/50 transition-colors duration-200 hover:bg-white"
              >
                <GoHome size={24} />
              </Link>
            </li>
          </menu>
        </header>

        <div className="grid aspect-square grid-cols-3 grid-rows-3 gap-4">
          {grid.map((pressedBy, i) => (
            <GameTile
              key={i}
              onClick={() => handleGameTileClick(i)}
              disabled={pressedBy !== PLAYER.NONE || winner !== PLAYER.NONE}
              pressedBy={pressedBy}
              isInverted={matchedIdxs.includes(i)}
            />
          ))}
        </div>

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
              className="bg-neutral-300"
            />
            <ScoreCard
              label="O Wins"
              value={scores.owins}
              className={PLAYER.Y.token.bgColor}
            />
          </ul>
        </footer>
      </aside>

      <article className="flex flex-1 flex-col justify-center gap-2 sm:gap-4">
        <h1 className="flex w-full text-right text-3xl font-bold sm:text-5xl">
          <span className={PLAYER.X.token.textColor}>Tic</span>
          <span className="text-neutral-300">Tac</span>
          <span className={PLAYER.Y.token.textColor}>Toe</span>
        </h1>
        <p className="text-white">
          Players take turns putting their marks in empty squares. The first
          player to get 3 of her marks in a row (up, down, across, or
          diagonally) is the winner. When all 9 squares are full, the game is
          over. If no player has 3 marks in a row, the game ends in a tie.
        </p>
      </article>
    </div>
  );
}

export default TicTacToe;
