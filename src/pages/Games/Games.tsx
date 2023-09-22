import { useEffect, useState } from "react";

import { Field } from "@/components";
import { getGames, type Game } from "@/pages/Games/api";
import { GameList } from "@/pages/Games/components";

function Games() {
  const [games, setGames] = useState<Game[] | null>(null);

  const [query, setQuery] = useState("");
  const [deferredQuery, setDeferredQuery] = useState(query);

  useEffect(() => {
    getGames().then(setGames);
  }, []);

  /* Artificial Slow */
  useEffect(() => {
    const deferredTimeout = setTimeout(() => {
      setDeferredQuery(query);
    }, 1000);

    () => clearTimeout(deferredTimeout);
  }, [query, setDeferredQuery]);

  return (
    <article className="wrapper mt-16 flex flex-col pb-16">
      <header className="flex flex-col gap-4">
        <h2 className="text-5xl font-bold text-neutral-300 md:text-6xl">
          🎮 <span className="text-gradient-primary">Games</span>
        </h2>
        <p className="text-sm text-neutral-300 md:text-base">
          Your gateway to endless gaming fun! Explore a variety of exciting
          games to challenge, entertain, and delight.
        </p>
      </header>

      <Field
        id="search"
        className="mt-12 w-full md:mt-16 md:w-1/3"
        render={(field) => (
          <input
            {...field}
            type="search"
            placeholder="Looking for something 🧐?"
            className="field"
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
        )}
      />

      <GameList
        query={deferredQuery}
        games={games}
        skeleton={games === null ? 6 : 0}
        loading={query !== deferredQuery}
      />
    </article>
  );
}

export default Games;
