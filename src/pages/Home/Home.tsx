import tictactoe from "@/assets/tictactoe-thumbnail.png";
import { GameCard } from "@/pages/Home/components";

function Home() {
  return (
    <main className="flex flex-col gap-8 pt-8 max-w-[768px] m-auto">
      <h1 className="flex flex-col text-center font-bold text-cyan-300 text-3xl sm:text-5xl">
        Retro Games
      </h1>

      <p className="text-center text-gray-300">
        Welcome to Retro Games, your gateway to the world of timeless and
        classic gaming experiences! We're here to take you on a nostalgic
        journey back to the golden era of video games, where simplicity, fun,
        and pure enjoyment were at the forefront of gaming.
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-3 mt-8 gap-4">
        <li>
          <GameCard
            image={tictactoe}
            title="TicTacToe"
            description="A fun little game of O and X."
          />
        </li>
      </ul>
    </main>
  );
}

export default Home;
