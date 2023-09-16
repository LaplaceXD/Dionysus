import clsx from "clsx";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

interface NavItemProps {
  selected?: boolean;
  type?: "primary" | "secondary";
  className?: string;
}

function NavItem({
  children,
  selected,
  className,
  type = "primary",
}: PropsWithChildren<NavItemProps>) {
  const primary = clsx(
    "text-white",
    !selected && "hover:bg-neutral-700 hover:cursor-pointer",
    selected &&
      "bg-gradient-to-tr from-secondary-500 to-secondary-600 hover:cursor-default"
  );

  const secondary = clsx(
    "text-primary-400",
    !selected &&
      "hover:outline-primary-400 hover:outline hover:outline-2 hover:cursor-pointer",
    selected &&
      "bg-gradient-to-tr from-primary-500 to-primary-600 hover:cursor-default"
  );

  return (
    <Link
      to="/"
      className={clsx(
        "block w-full rounded-md py-2 px-4 font-bold text-sm sm:text-base transition-colors duration-200",
        type === "primary" && primary,
        type === "secondary" && secondary,
        className
      )}
    >
      {children}
    </Link>
  );
}

export default NavItem;
