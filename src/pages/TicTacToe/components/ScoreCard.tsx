import clsx from "clsx";

interface ScoreCardProps {
  label: string;
  value: number;
  className?: string;
}

function ScoreCard({ label, value, className }: ScoreCardProps) {
  return (
    <li
      className={clsx(
        "flex flex-col items-center w-full rounded-lg text-gray-800 px-2 py-1",
        className
      )}
    >
      <span className="sm:text-lg text-sm">{label}</span>
      <span className="font-bold sm:text-3xl text-xl mt-[-4px]">{value}</span>
    </li>
  );
}

export default ScoreCard;
