import clsx from "clsx";
import { Children, PropsWithChildren, useState } from "react";

function NavBar({ children }: PropsWithChildren) {
  const [open, setOpen] = useState<boolean>(false);

  const lineStyle =
    "absolute right-0 w-[32px] h-[4px] rounded-full bg-neutral-400 group-hover:bg-white transition-all duration-300";

  return (
    <nav className="flex gap-3">
      <div
        role="button"
        className="group relative hover:cursor-pointer md:hidden"
        onClick={() => setOpen((open) => !open)}
      >
        <div
          className={clsx(
            lineStyle,
            "top-[-8px]",
            open && "rotate-45 translate-y-[4px] top-[-3px]"
          )}
        ></div>
        <div className={clsx(lineStyle, open && "opacity-0")}></div>
        <div
          className={clsx(
            lineStyle,
            "top-[8px]",
            open && "-rotate-45 -translate-y-[4px] top-[5px]"
          )}
        ></div>
      </div>

      <menu
        className={clsx(
          "fixed w-[95vw] left-1/2 -translate-x-1/2 translate-y-0 bottom-4 bg-neutral-800 rounded-lg p-4 flex flex-col transition-transform duration-300",
          "md:static md:w-auto md:flex-row md:bg-trasparent md:translate-x-0 md:gap-1 lg:gap-2 md:translate-y-0",
          !open && "translate-y-56"
        )}
      >
        {Children.map(children, (child, i) => (
          <li key={i}>{child}</li>
        ))}
      </menu>
    </nav>
  );
}

export default NavBar;
