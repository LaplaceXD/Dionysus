import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

import { NavBar, NavItem } from "@/components/Nav";

function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <header className="wrapper max-w-[1280px] pt-2 flex items-center gap-2">
        <Link to="/" className="font-bold text-3xl md:text-4xl flex-1">
          🎉 <span className="text-white">Dionysus</span>
        </Link>

        <NavBar>
          <NavItem to="/" selected>
            Home
          </NavItem>
          <NavItem to="/games">Games</NavItem>
          <NavItem
            to="donate"
            className="text-center mt-6 md:mt-0 lg:ml-4"
            type="secondary"
          >
            Toss a coin?
          </NavItem>
        </NavBar>
      </header>

      <main>{children}</main>
    </>
  );
}

export default MainLayout;
