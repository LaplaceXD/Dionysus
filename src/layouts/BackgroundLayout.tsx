import { PropsWithChildren } from "react";

function BackgroundLayout({ children }: PropsWithChildren) {
  return <div className="min-h-[100dvh] bg-neutral-900">{children}</div>;
}

export default BackgroundLayout;
