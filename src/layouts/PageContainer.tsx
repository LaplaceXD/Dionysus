import { PropsWithChildren } from "react";

function PageContainer({ children }: PropsWithChildren) {
  return (
    <div className="min-h-[100dvh] bg-gray-900">
      {children}
    </div>
  );
}

export default PageContainer;
