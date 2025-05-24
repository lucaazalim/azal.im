import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLHeadingElement>;

export default function PageTitle({ className, children, ...props }: Props) {
  return (
    <h1 className={cn("font-serif text-4xl font-bold", className)} {...props}>
      {children}
    </h1>
  );
}
