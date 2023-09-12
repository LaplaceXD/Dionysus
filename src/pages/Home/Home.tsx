import tictactoe from "@/assets/tictactoe-thumbnail.png";
import { GameCard } from "@/pages/Home/components";
import { SectionLayout } from "@/layout";

function Home() {
  return (
    <main className="flex flex-col gap-8 pt-8 max-w-[768px] m-auto">
      <SectionLayout
        title={<span className="text-cyan-300">Retro Games</span>}
        description="Welcome to Retro Games, your gateway to the world of timeless and classic gaming experiences! We're here to take you on a nostalgic journey back to the golden era of video games, where simplicity, fun, and pure enjoyment were at the forefront of gaming."
      >
        <ul className="grid grid-cols-1 sm:grid-cols-3 mt-8 gap-4">
          <li>
            <GameCard
              image={tictactoe}
              title="TicTacToe"
              description="A fun little game of O and X."
              to="tictactoe"
            />
          </li>
        </ul>
      </SectionLayout>
    </main>
  );
}

export default Home;
