import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import { Main } from "@/layout";
import { Home } from "@/pages/Home";
import { TicTacToe } from "@/pages/TicTacToe";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Main>
        <Outlet />
      </Main>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "tictactoe",
        element: <TicTacToe />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
