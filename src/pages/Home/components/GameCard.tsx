import { Link, To } from "react-router-dom";

interface GameCardProps {
  image: string;
  title: string;
  description: string;
  to?: To | null;
}

function GameCard({ image, title, description, to = null }: GameCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-xl opacity-40 hover:opacity-100 hover:shadow-2xl hover:shadow-cyan-200/50 hover:cursor-pointer transition-all duration-300">
      <img
        src={image}
        alt={title}
        className="object-cover w-fill aspect-video sm:aspect-[3/4] grayscale group-hover:grayscale-0 transition-all duration-300"
      />
      <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 inset-0 w-full h-full flex flex-col justify-end p-6 bg-gradient-to-t from-gray-900 text-white">
        <h2 className="font-bold text-xl">{title}</h2>
        <p className="text-sm">{description}</p>
        {to && <Link to={to} className="absolute w-full h-full" />}
      </div>
    </article>
  );
}

export default GameCard;
