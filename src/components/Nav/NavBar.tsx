import clsx from "clsx";
import { Children, PropsWithChildren, useState } from "react";

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
          "absolute top-[-8px]",
          toggled && "rotate-45 top-0"
        )}
      ></div>
      <div className={clsx(lineStyle, toggled && "opacity-0")}></div>
      <div
        className={clsx(
          lineStyle,
          "absolute top-[8px]",
          toggled && "-rotate-45 top-0"
        )}
      ></div>
    </div>
  );
}

function NavBar({ children }: PropsWithChildren) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <nav className="flex gap-3">
      <HamburgerMenu toggled={open} onToggle={() => setOpen((open) => !open)} />

      <menu
        className={clsx(
          "fixed z-10 w-[92.5vw] left-1/2 -translate-x-1/2 translate-y-0 bottom-4 bg-neutral-800 rounded-lg p-4 flex flex-col transition-transform duration-300 shadow-xl shadow-neutral-950/50",
          "md:static md:w-auto md:flex-row md:bg-trasparent md:translate-x-0 md:gap-1 lg:gap-2 md:translate-y-0",
          !open && "translate-y-56"
        )}
      >
        {Children.map(children, (child, i) => (
          <li key={i}>{child}</li>
        ))}
        <button
          onClick={() => setOpen(false)}
          className="btn btn-secondary font-bold md:hidden"
        >
          Close
        </button>
      </menu>
    </nav>
  );
}

export default NavBar;
