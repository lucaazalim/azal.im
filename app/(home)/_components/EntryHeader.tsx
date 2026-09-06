import { Badge } from "@/app/_components/ui/badge";
import { ReactNode } from "react";

type Props = {
  title: string;
  /** Rendered under the title, e.g. the company or school. */
  subtitle?: ReactNode;
  badge?: string;
  /** e.g. `Jul 2025 – Present` */
  dateRange?: string;
  /** Shown under the date range, e.g. `1 yr 3 mos` or `Expected`. */
  dateNote?: string;
  /** e.g. `Orlando, Florida, United States · Remote` */
  location?: string | null;
};

/**
 * Two-column header for homepage entries: what and where (title, then subtitle
 * and location on one line) on the left, when (dates) on the right. Stacks on
 * small screens.
 */
export default function EntryHeader({
  title,
  subtitle,
  badge,
  dateRange,
  dateNote,
  location,
}: Props) {
  return (
    <header className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
      <div className="min-w-0 space-y-0.5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          {badge && <Badge>{badge}</Badge>}
        </div>
        {(subtitle || location) && (
          <p className="text-muted-foreground flex flex-wrap items-baseline gap-x-2 text-sm">
            {subtitle}
            {subtitle && location && (
              <span className="text-muted-foreground/50" aria-hidden="true">
                &middot;
              </span>
            )}
            {location}
          </p>
        )}
      </div>
      {dateRange && (
        <div className="shrink-0 space-y-1 text-xs sm:text-right">
          <p className="text-foreground/80 font-mono tracking-wider uppercase">
            {dateRange}
          </p>
          {dateNote && (
            <p className="text-muted-foreground/70 font-mono tracking-wider uppercase">
              {dateNote}
            </p>
          )}
        </div>
      )}
    </header>
  );
}
