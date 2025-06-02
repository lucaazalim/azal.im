import { HTMLAttributes } from "react";

export default function ProjectMain({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <main
      className="animate-in fade-in mx-auto mb-10 flex max-w-7xl flex-col items-center space-y-16 border-t-2 border-dashed p-10 duration-500 ease-out xl:border-2"
      {...props}
    >
      {children}
    </main>
  );
}
