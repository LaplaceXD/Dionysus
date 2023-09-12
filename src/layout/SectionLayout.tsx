import { PropsWithChildren, ReactElement } from "react";

interface SectionLayoutProps {
  leadingTitle?: boolean;
  title: ReactElement | string;
  description: string;
}

function SectionLayout({
  children,
  title,
  description,
  leadingTitle = true,
}: PropsWithChildren<SectionLayoutProps>) {
  return (
    <div className="flex flex-col justify-center items-center lg:flex-row gap-16 max-w-[1024px]">
      {leadingTitle ? null : children}

      <article className="flex flex-col gap-2 sm:gap-4 flex-1 justify-center">
        <h1 className="flex font-bold text-center text-3xl sm:text-5xl text-right w-full">
          {title}
        </h1>
        <p className="text-white">{description}</p>

        {leadingTitle ? children : null}
      </article>
    </div>
  );
}

export default SectionLayout;
