import tictactoe from "@/assets/tictactoe-thumbnail.png";
import { Field } from "@/components";
import { GameCard } from "@/pages/Games/components";

function Games() {
  return (
    <article className="wrapper mt-16 flex flex-col">
      <header className="flex flex-col gap-4">
        <h2 className="text-5xl font-bold text-neutral-300 md:text-6xl">
          🎮 <span className="text-gradient-primary">Games</span>
        </h2>
        <p className="text-sm text-neutral-300 md:text-base">
          Your gateway to endless gaming fun! Explore a variety of exciting
          games to challenge, entertain, and delight.
        </p>
      </header>

      <search className="mt-12 w-full md:mt-16 md:w-1/3">
        <Field
          id="search"
          render={(field) => (
            <input
              {...field}
              type="search"
              placeholder="Looking for something 🧐?"
              className="field"
            />
          )}
        />
      </search>

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <li>
          <GameCard
            image={tictactoe}
            title="TicTacToe"
            description="A fun little game of O and X."
            to="tictactoe"
          />
        </li>
      </ul>
    </article>
  );
}

export default Games;
