import { PropsWithChildren, useEffect, useState } from "react";
import { Link, useMatches } from "react-router-dom";

import { NavBar, NavItem } from "@/components";

function MainLayout({ children }: PropsWithChildren) {
  const [navBarOpen, setNavBarOpen] = useState(false);
  const matches = useMatches();

  useEffect(() => {
    window.scrollTo(0, 0);
    setNavBarOpen(false);
  }, [matches]);

  return (
    <>
      <header className="wrapper flex max-w-[1280px] items-center justify-between gap-2 pt-2">
        <Link to="/" className="group text-3xl font-bold md:text-4xl">
          🎉{" "}
          <span className="group-hover:text-gradient-primary text-white transition-colors duration-200">
            Dionysus
          </span>
        </Link>

        <NavBar
          open={navBarOpen}
          onOpen={() => setNavBarOpen(true)}
          onClose={() => setNavBarOpen(false)}
        >
          <NavItem to="/" selected={matches[1]?.pathname === "/"}>
            Home
          </NavItem>
          <NavItem to="/games" selected={matches[1]?.pathname === "/games"}>
            Games
          </NavItem>
          <NavItem
            to="/donate"
            className="mt-6 md:mt-0 lg:ml-4"
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
