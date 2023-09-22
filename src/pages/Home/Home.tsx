import tictactoe from "@/assets/tictactoe-thumbnail.png";
import { GameCard } from "@/pages/Games/components";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="wrapper mt-40 grid grid-cols-12 items-center gap-y-32 overflow-x-clip md:gap-8">
        <div className="relative col-span-12 text-center md:col-span-7">
          <span className="z-10 text-[25vw] motion-safe:animate-pulse md:text-[15vw]">
            🥳
          </span>
          <span className="absolute text-5xl motion-safe:animate-spin">🎊</span>
          <span className="absolute -bottom-24 left-52 text-5xl motion-safe:animate-tada">
            🎉
          </span>
          <span className="absolute bottom-0 left-0 text-6xl motion-safe:animate-spin">
            🎊
          </span>
          <span className="absolute -top-24 left-28 text-6xl motion-safe:animate-tada">
            🎉
          </span>
          <span className="invisible absolute bottom-16 right-0 text-7xl motion-safe:animate-tada md:visible">
            🎉
          </span>
        </div>

        <article className="col-span-12 flex flex-col gap-8 md:col-span-5">
          <h1 className="text-gradient-primary text-5xl font-extrabold md:text-6xl">
            Play Games with Friends!
          </h1>
          <p className="text-sm text-neutral-300 md:text-base">
            Welcome to Dionysus - Your Gateway to Multiplayer Fun! Dive into a
            world of online games where you can play and connect with friends
            for unforgettable gaming experiences. Join the party now!
          </p>
          <Link to="/games" className="btn btn-primary w-fill md:w-fit">
            Browse Games <FaSearch />
          </Link>
        </article>
      </div>

      <div className="mt-24 bg-neutral-950 py-24 md:mt-64">
        <article className="wrapper flex flex-col gap-8">
          <h2 className="text-center text-4xl font-bold text-neutral-300">
            😲 Most Played Games
          </h2>
          <p className="text-center text-sm text-neutral-300 md:text-base">
            Explore the Best: Check out our top-played games! These are the
            absolute favorites among our players, offering non-stop fun and
            competition. Join in and see why they're the best!
          </p>

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
      </div>
    </>
  );
}

export default Home;
