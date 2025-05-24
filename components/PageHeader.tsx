import HomeButton from "@/app/(home)/_components/HomeButton";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export default function PageHeader({ className, children, ...props }: Props) {
  return (
    <header
      className={cn(
        "animate-in fade-in mx-auto flex max-w-[950px] flex-col items-center space-y-5 text-center duration-500 ease-in",
        className,
      )}
      {...props}
    >
      <HomeButton />
      <div className="space-y-3">{children}</div>
    </header>
  );
}
