import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLParagraphElement>;

export default function PageDescription({
  className,
  children,
  ...props
}: Props) {
  return (
    <p
      className={cn("text-foreground/70 max-w-lg text-xl", className)}
      {...props}
    >
      {children}
    </p>
  );
}
