import { clsx } from "clsx";
import { PropsWithChildren, ReactElement } from "react";

interface SectionLayoutProps {
  endTitle?: boolean;
  isHorizontal?: boolean;
  title: ReactElement | string;
  description: string;
}

function SectionLayout({
  children,
  title,
  description,
  isHorizontal = false,
  endTitle = false,
}: PropsWithChildren<SectionLayoutProps>) {
  return (
    <div
      className={clsx(
        "flex flex-col justify-center items-center gap-16 max-w-[1024px] w-[90%] m-auto",
        isHorizontal && "lg:flex-row"
      )}
    >
      {endTitle ? children : null}

      <article className="flex flex-col gap-2 sm:gap-4 flex-1 justify-center">
        <h1 className="flex font-bold text-3xl sm:text-5xl text-right w-full">
          {title}
        </h1>
        <p className="text-white">{description}</p>
      </article>

      {endTitle ? null : children}
    </div>
  );
}

export default SectionLayout;
