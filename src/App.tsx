import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import { BackgroundLayout, MainLayout } from "@/layouts";
import { Donate } from "@/pages/Donate";
import { Games } from "@/pages/Games";
import { Home } from "@/pages/Home";
import { TicTacToe } from "@/pages/TicTacToe";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <BackgroundLayout>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </BackgroundLayout>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "games",
        children: [
          {
            index: true,
            element: <Games />,
          },
          {
            path: "tictactoe",
            element: <TicTacToe />,
          },
        ],
      },
      {
        path: "donate",
        element: <Donate />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
