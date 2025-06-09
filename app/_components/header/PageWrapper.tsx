import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export default function PageWrapper({ className, ...props }: Props) {
  return (
    <div
      className={cn(
        className,
        "mx-auto space-y-10 px-5 pb-5 md:px-10 md:pb-10",
      )}
      {...props}
    />
  );
}
