import { Link, To } from "react-router-dom";

interface GameCardProps {
  image: string;
  title: string;
  description: string;
  to?: To | null;
}

function GameCard({ image, title, description, to = null }: GameCardProps) {
  return (
    <article className="relative group rounded-xl hover:cursor-pointer transition-all duration-300 pb-6">
      <img
        src={image}
        alt={title}
        className="object-cover rounded-lg w-fill aspect-[2/1] sm:aspect-[3/2] grayscale group-hover:grayscale-0 group-hover:shadow-2xl group-hover:shadow-secondary-500/20  transition-all duration-300"
      />
      <h3 className="mt-6 font-bold text-xl md:text-2xl text-neutral-300 group-hover:text-gradient-primary">
        {title}
      </h3>
      <p className="text-sm md:text-base text-neutral-300 group-hover:text-gradient-primary">
        {description}
      </p>
      {to && <Link to={to} className="absolute w-full h-full bottom-0" />}
    </article>
  );
}

export default GameCard;
