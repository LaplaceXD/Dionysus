import clsx from "clsx";
import { PropsWithChildren, ReactNode } from "react";

interface ShimmerProps {
  fallback?: ReactNode;
  className?: string;
  loading?: boolean;
}

function Shimmer({
  fallback,
  className,
  children,
  loading = false,
}: PropsWithChildren<ShimmerProps>) {
  return (
    <div className={clsx("relative", className)}>
      {children}
      {loading ? (
        <div className="top-0 absolute gradient-shimmer animate-shimmer w-full h-full">
          {fallback}
        </div>
      ) : null}
    </div>
  );
}

export default Shimmer;
