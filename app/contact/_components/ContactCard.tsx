import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { AnchorHTMLAttributes } from "react";

type Props = {
  icon: LucideIcon;
  label: string;
  text: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function ContactCard({
  icon: Icon,
  label,
  text,
  href,
  className,
}: Props) {
  return (
    <a href={href} className={className}>
      <div
        className={cn(
          "bg-accent flex flex-row items-center gap-4 border p-3 transition-all ease-in-out",
          href && "group hover:border-foreground/20",
        )}
      >
        <div className="bg-background group-hover:border-foreground/20 flex aspect-square h-full items-center justify-center border p-3 transition-all ease-in-out">
          <Icon className="size-5" />
        </div>
        <div className="flex grow flex-col gap-0.5">
          <span className="font-mono text-xs uppercase">{label}</span>
          <span className="font-medium">{text}</span>
        </div>
      </div>
    </a>
  );
}
