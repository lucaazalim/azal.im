import * as motion from "@/app/_components/Motion";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
} & Omit<React.HTMLAttributes<HTMLSpanElement>, "children">;

export default function SplitText({ text, className }: Props) {
  return text.split("").map((char, index) => (
    <motion.span
      initial={{ opacity: 0, y: 5, filter: "blur(2px)" }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: "easeInOut" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      key={index}
      className={cn("inline-block", className)}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ));
}
