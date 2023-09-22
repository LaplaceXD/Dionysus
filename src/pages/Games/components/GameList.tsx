import { useMemo } from "react";

import { type Game } from "@/pages/Games/api";
import { GameCard } from "@/pages/Games/components";

interface GameListProps {
  games?: Game[] | null;
  query?: string;
  loading?: boolean;
  skeleton?: number;
}

function GameList({
  games,
  query,
  skeleton = 0,
  loading = false,
}: GameListProps) {
  const filteredGames = useMemo(() => {
    let filtered: Game[] = [];

    if (games && query) {
      filtered = games.filter(({ title, description }) => {
        const substring = query.toLowerCase();

        const titleMatched = title.toLowerCase().includes(substring);
        const descMatched = description.toLowerCase().includes(substring);

        return titleMatched || descMatched;
      });
    } else if (games) {
      filtered = games;
    }

    return filtered;
  }, [games, query]);

  return (
    <div
      className={loading ? "opacity-50 transition-opacity duration-200" : ""}
    >
      {filteredGames.length === 0 && !skeleton ? (
        <p className="mt-16 text-center text-4xl font-bold text-white">
          No games found. 😢
        </p>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-y-1 sm:grid-cols-3 md:gap-4">
          {skeleton !== 0
            ? Array.from({ length: skeleton }).map((_, i) => (
                <li key={i}>
                  <GameCard
                    title="Loading..."
                    description="Loading..."
                    loading
                  />
                </li>
              ))
            : filteredGames.map(({ _uid, ...props }) => (
                <li key={_uid}>
                  <GameCard {...props} />
                </li>
              ))}
        </ul>
      )}
    </div>
  );
}

export default GameList;
