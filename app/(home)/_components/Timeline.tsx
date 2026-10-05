import { cn } from "@/lib/utils";
import { ReactNode } from "react";

/** `current` is ongoing, `past` has ended, `break` is a career break. */
export type TimelineMarker = "current" | "past" | "break";

const markerClassNames: Record<TimelineMarker, string> = {
  current: "border-primary bg-primary ring-primary/20 ring-4",
  past: "border-foreground/40 bg-background",
  break: "border-foreground/30 bg-background border-dashed",
};

export function Timeline({ children }: { children: ReactNode }) {
  return <ol>{children}</ol>;
}

type ItemProps = {
  marker: TimelineMarker;
  children: ReactNode;
};

/**
 * One entry on a vertical timeline: a square marker aligned with the entry's
 * title, joined to the next entry's marker by a rail.
 */
export function TimelineItem({ marker, children }: ItemProps) {
  return (
    <li className="group/item relative pb-14 pl-9 last:pb-0">
      <span
        aria-hidden="true"
        className="bg-border absolute top-6 -bottom-1 left-[5px] w-px group-last/item:hidden"
      />
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-2 left-0 size-[11px] border",
          markerClassNames[marker],
        )}
      />
      {children}
    </li>
  );
}
