import tictactoe from "@/assets/tictactoe-thumbnail.png";
import { MainLayout } from "@/layouts";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GameCard } from "./components";

function Home() {
  return (
    <MainLayout>
      <div className="wrapper mt-40 grid grid-cols-12 gap-y-32 md:gap-8 items-center overflow-x-clip">
        <div className="relative col-span-12 md:col-span-7 text-center">
          <span className="motion-safe:animate-pulse text-[25vw] md:text-[15vw] z-10">
            🥳
          </span>
          <span className="motion-safe:animate-spin absolute text-5xl">🎊</span>
          <span className="motion-safe:animate-tada absolute text-5xl -bottom-24 left-52">
            🎉
          </span>
          <span className="motion-safe:animate-spin absolute text-6xl bottom-0 left-0">
            🎊
          </span>
          <span className="motion-safe:animate-tada absolute text-6xl -top-24 left-28">
            🎉
          </span>
          <span className="motion-safe:animate-tada absolute text-7xl bottom-16 right-0 invisible md:visible">
            🎉
          </span>
        </div>

        <article className="flex flex-col gap-8 col-span-12 md:col-span-5">
          <h1 className="font-extrabold text-5xl md:text-6xl text-gradient-primary">
            Play Games with Friends!
          </h1>
          <p className="text-neutral-300 text-sm md:text-base">
            Welcome to Dionysus - Your Gateway to Multiplayer Fun! Dive into a
            world of online games where you can play and connect with friends
            for unforgettable gaming experiences. Join the party now!
          </p>
          <Link to="/games" className="btn btn-primary w-fill md:w-fit">
            Browse Games <FaSearch />
          </Link>
        </article>
      </div>

      <div className="bg-neutral-950 mt-24 md:mt-64 py-24">
        <article className="wrapper flex flex-col gap-8">
          <h2 className="text-neutral-300 font-bold text-4xl text-center">
            😲 Most Played Games
          </h2>
          <p className="text-neutral-300 text-sm md:text-base text-center">
            Explore the Best: Check out our top-played games! These are the
            absolute favorites among our players, offering non-stop fun and
            competition. Join in and see why they're the best!
          </p>

          <section>
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
          </section>
        </article>
      </div>
    </MainLayout>
  );
}

export default Home;
