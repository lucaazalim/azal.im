import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLParagraphElement>;

export default function PageHeaderDescription({
  className,
  children,
  ...props
}: Props) {
  return (
    <p
      className={cn(
        "text-foreground/70 max-w-lg text-lg md:text-xl",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
