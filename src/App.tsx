import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import { BackgroundLayout, MainLayout } from "@/layouts";
import { Home } from "@/pages/Home";
import { TicTacToe } from "@/pages/TicTacToe";
import { Donate } from "@/pages/Donate";

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
        path: "tictactoe",
        element: <TicTacToe />,
      },
      {
        path: "donate",
        element: <Donate />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
