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
        "mx-auto flex flex-col items-center p-8 text-center",
        animation && "animate-in fade-in duration-500 ease-out",
        className,
      )}
      {...props}
    >
      <div className="space-y-3">{children}</div>
    </header>
  );
}
