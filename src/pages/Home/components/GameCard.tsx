import { Link, To } from "react-router-dom";

interface GameCardProps {
  image: string;
  title: string;
  description: string;
  to?: To | null;
}

function GameCard({ image, title, description, to = null }: GameCardProps) {
  return (
    <article className="group relative rounded-xl pb-6 transition-all duration-300 hover:cursor-pointer">
      <img
        src={image}
        alt={title}
        className="w-fill aspect-[2/1] rounded-lg object-cover grayscale transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-secondary-500/20  group-hover:grayscale-0 sm:aspect-[3/2]"
      />
      <h3 className="group-hover:text-gradient-primary mt-6 text-xl font-bold text-neutral-300 md:text-2xl">
        {title}
      </h3>
      <p className="group-hover:text-gradient-primary text-sm text-neutral-300 md:text-base">
        {description}
      </p>
      {to && <Link to={to} className="absolute bottom-0 h-full w-full" />}
    </article>
  );
}

export default GameCard;
