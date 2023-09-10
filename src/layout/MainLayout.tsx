import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-w-[100dvw] min-h-[100dvh] bg-gray-900 px-12">
      <Outlet />
    </div>
  );
}

export default MainLayout;
