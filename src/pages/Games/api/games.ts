import tictactoe from "@/assets/tictactoe-thumbnail.png";

export type Game = {
  _uid: number;
  title: string;
  description: string;
  image: string;
  to: string;
  plays: number;
  playable: boolean;
};

const games: Game[] = [
  {
    _uid: 1,
    title: "TicTacToe",
    description: "A fun little game of O and X.",
    image: tictactoe,
    to: "/tictactoe",
    plays: 9000,
    playable: true,
  },
];

export async function getGames() {
  /* Sleep for 2.5 seconds */
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 2500));

  return games;
}
