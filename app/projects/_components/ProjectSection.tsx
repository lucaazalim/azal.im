import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export default function ProjectSection({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("prose prose-primary dark:prose-invert mx-auto", className)}
    >
      {children}
    </div>
  );
}
