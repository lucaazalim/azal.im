import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export default function PageHeader({ className, children, ...props }: Props) {
  return (
    <header
      className={cn(
        "mx-auto flex flex-col items-center p-8 text-center",
        "animate-in fade-in slide-in-from-bottom-[20px] duration-750 ease-in-out",
        className,
      )}
      {...props}
    >
      <div className="space-y-3">{children}</div>
    </header>
  );
}
