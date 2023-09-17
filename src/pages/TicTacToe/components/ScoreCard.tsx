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
        "flex w-full flex-col items-center rounded-lg px-2 py-1 text-neutral-800",
        className
      )}
    >
      <span className="text-sm sm:text-lg">{label}</span>
      <span className="mt-[-4px] text-xl font-bold sm:text-3xl">{value}</span>
    </li>
  );
}

export default ScoreCard;
