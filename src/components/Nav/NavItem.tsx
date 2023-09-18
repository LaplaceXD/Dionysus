import clsx from "clsx";
import { PropsWithChildren } from "react";
import { Link, To } from "react-router-dom";

interface NavItemProps {
  to: To;
  selected?: boolean;
  type?: "primary" | "secondary";
  className?: string;
}

function NavItem({
  children,
  selected,
  className,
  to,
  type = "primary",
}: PropsWithChildren<NavItemProps>) {
  return (
    <Link
      to={to}
      className={clsx(
        "btn font-bold",
        type === "primary" && "btn-secondary justify-start",
        type === "secondary" && "btn-accent",
        selected && "btn-active",
        className
      )}
    >
      {children}
    </Link>
  );
}

export default NavItem;
