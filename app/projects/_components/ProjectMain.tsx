import { HTMLAttributes } from "react";

export default function ProjectMain({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <main
      className="mx-auto mb-10 flex max-w-7xl flex-col items-center space-y-16 border-t-2 border-dashed p-10 xl:border-2"
      {...props}
    >
      {children}
    </main>
  );
}
