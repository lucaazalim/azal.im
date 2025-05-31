import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ProjectImageCarousel({ children }: Props) {
  return (
    <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-10 md:flex-row">
      {children}
    </div>
  );
}
