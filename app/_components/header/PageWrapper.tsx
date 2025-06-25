import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export default function PageWrapper({ className, ...props }: Props) {
  return <div className={cn(className, "mx-auto px-5 pb-10")} {...props} />;
}
