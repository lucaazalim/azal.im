import HomeButton from "@/app/(home)/_components/HomeButton";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Props = {
  animation?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export default function PageHeader({
  animation = true,
  className,
  children,
  ...props
}: Props) {
  return (
    <header
      className={cn(
        "mx-auto flex max-w-[950px] flex-col items-center space-y-5 text-center",
        animation && "animate-in fade-in duration-500 ease-in",
        className,
      )}
      {...props}
    >
      <HomeButton />
      <div className="space-y-3">{children}</div>
    </header>
  );
}
