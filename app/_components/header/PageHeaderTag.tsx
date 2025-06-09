import * as motion from "@/app/_components/Motion";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLSpanElement>;

export default function PageHeaderTag({
  children,
  className,
  ...props
}: Props) {
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <Line />
      <span
        className={cn(className, "font-mono font-light uppercase opacity-50")}
      >
        {children}
      </span>
      <Line />
    </div>
  );
}

function Line() {
  return (
    <motion.div
      initial={{ width: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      animate={{ width: "2rem" }}
      className="border-b"
    />
  );
}
