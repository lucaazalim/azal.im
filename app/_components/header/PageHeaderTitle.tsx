import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLHeadingElement>;

export default function PageHeaderTitle({
  className,
  children,
  ...props
}: Props) {
  return (
    <h1
      className={cn("font-serif text-3xl font-bold md:text-4xl", className)}
      {...props}
    >
      {children}
    </h1>
  );
}
