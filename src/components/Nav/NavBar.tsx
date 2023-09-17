import clsx from "clsx";
import { Children, PropsWithChildren } from "react";

interface HamburgerMenuProps {
  toggled: boolean;
  onToggle: () => void;
  className?: string;
}

function HamburgerMenu({ toggled, onToggle, className }: HamburgerMenuProps) {
  const lineStyle =
    "right-0 w-[32px] h-[4px] rounded-full bg-neutral-400 group-hover:bg-white transition-all duration-300";

  return (
    <div
      role="button"
      className={clsx(
        "group relative hover:cursor-pointer md:hidden",
        className
      )}
      onClick={onToggle}
    >
      <div
        className={clsx(
          lineStyle,
          "absolute top-0",
          toggled ? "translate-y-0 rotate-45" : "-translate-y-2"
        )}
      ></div>
      <div className={clsx(lineStyle, toggled && "opacity-0")}></div>
      <div
        className={clsx(
          lineStyle,
          "absolute top-0",
          toggled ? "translate-y-0 -rotate-45" : "translate-y-2"
        )}
      ></div>
    </div>
  );
}

interface NavBarProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

function NavBar({
  open,
  onOpen,
  onClose,
  children,
}: PropsWithChildren<NavBarProps>) {
  return (
    <nav className="flex gap-3">
      <HamburgerMenu toggled={open} onToggle={open ? onClose : onOpen} />

      <menu
        className={clsx(
          "fixed bottom-4 left-1/2 z-10 flex w-[92.5vw] -translate-x-1/2 translate-y-0 flex-col rounded-lg bg-neutral-800 p-4 shadow-xl shadow-neutral-950/50 transition-transform duration-300 md:shadow-none",
          "md:static md:w-auto md:translate-x-0 md:translate-y-0 md:flex-row md:gap-1 md:bg-trasparent lg:gap-2",
          !open && "translate-y-56"
        )}
      >
        {Children.map(children, (child, i) => (
          <li key={i}>{child}</li>
        ))}

        <li>
          <button
            onClick={onClose}
            className="btn btn-secondary w-full font-bold md:hidden"
          >
            Close
          </button>
        </li>
      </menu>
    </nav>
  );
}

export default NavBar;
