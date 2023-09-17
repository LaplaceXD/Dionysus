import clsx from "clsx";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
  PropsWithoutRef,
  ReactNode,
} from "react";

interface ShimmerProps
  extends PropsWithoutRef<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  > {
  fallback?: ReactNode | null;
  loading?: boolean;
}

function Shimmer({
  className,
  children,
  fallback = null,
  loading = false,
  ...props
}: PropsWithChildren<ShimmerProps>) {
  return (
    <div className={clsx("relative", className)} {...props}>
      {children}
      {loading ? (
        <div className="top-0 absolute gradient-shimmer animate-shimmer w-full h-full cursor-default">
          {fallback}
        </div>
      ) : null}
    </div>
  );
}

export default Shimmer;
