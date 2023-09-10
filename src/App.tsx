import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import { Home } from "@/pages/Home";
import { TicTacToe } from "@/pages/TicTacToe";

function MainLayout() {
  return (
    <div className="min-w-screen min-h-screen bg-gray-900 px-12">
      <Outlet />
    </div>
  );
}

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
