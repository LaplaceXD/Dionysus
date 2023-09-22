import { Shimmer } from "@/components";
import clsx from "clsx";
import { useState } from "react";
import { Link, To } from "react-router-dom";

interface GameCardProps {
  image?: string;
  title?: string;
  description?: string;
  to?: To | null;
  loading?: boolean;
}

function GameCard({
  image,
  title,
  description,
  loading = false,
  to = null,
}: GameCardProps) {
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <article
      className={clsx(
        "group relative rounded-xl pb-6 transition-all duration-300",
        !loading && "hover:cursor-pointer"
      )}
    >
      <Shimmer
        loading={loading || imgLoading}
        className="overflow-clip rounded-lg"
      >
        <img
          src={image}
          alt={title}
          className={clsx(
            "w-fill aspect-[2/1] rounded-lg object-cover grayscale transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-secondary-500/20  group-hover:grayscale-0 sm:aspect-[3/2]",
            (loading || imgLoading) && "invisible"
          )}
          onLoad={() => setImgLoading(false)}
        />
      </Shimmer>

      <Shimmer
        loading={loading}
        className="w-fit min-w-[192px] overflow-clip rounded-md"
      >
        <h3
          className={clsx(
            "group-hover:text-gradient-primary text-xl font-bold text-neutral-300 md:text-2xl",
            loading ? "invisible mt-4" : "mt-6"
          )}
        >
          {title}
        </h3>
      </Shimmer>

      <Shimmer loading={loading} className="overflow-clip rounded-md">
        <p
          className={clsx(
            "group-hover:text-gradient-primary text-sm text-neutral-300 md:text-base",
            loading && "invisible mt-2"
          )}
        >
          {description}
        </p>
      </Shimmer>

      {!loading && to && (
        <Link to={to} className="absolute bottom-0 h-full w-full" />
      )}
    </article>
  );
}

export default GameCard;
