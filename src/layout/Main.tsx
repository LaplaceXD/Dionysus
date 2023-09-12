import { PropsWithChildren } from "react";

function Main({ children }: PropsWithChildren) {
  return (
    <div className="min-w-[100dvw] min-h-[100dvh] bg-gray-900 px-12">
    {children}
    </div>
  );
}

export default Main;
