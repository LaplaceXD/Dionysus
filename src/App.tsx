import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainLayout } from "@/layout";
import { Home } from "@/pages/Home";
import { TicTacToe } from "@/pages/TicTacToe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
