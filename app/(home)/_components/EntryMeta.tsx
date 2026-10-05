import { LucideIcon } from "lucide-react";

export type EntryMetaItem = {
  icon: LucideIcon;
  /** Read by screen readers in place of the icon, e.g. `Period`. */
  label: string;
  text: string | null;
};

/**
 * A row of icon-labeled facts under an entry title (dates, location,
 * employment type). Items without text are skipped.
 */
export default function EntryMeta({ items }: { items: EntryMetaItem[] }) {
  return (
    <ul className="text-muted-foreground flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-xs tracking-wide uppercase">
      {items
        .filter((item) => item.text)
        .map(({ icon: Icon, label, text }) => (
          <li key={label} className="flex items-center gap-1.5">
            <Icon aria-hidden="true" className="size-3.5 shrink-0" />
            <span className="sr-only">{label}:</span>
            {text}
          </li>
        ))}
    </ul>
  );
}
