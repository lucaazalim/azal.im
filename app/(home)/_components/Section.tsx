import {
  HOME_SECTIONS,
  HomeSectionId,
  homeGridClassName,
  sectionNumber,
} from "@/app/(home)/_components/home";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  id: HomeSectionId;
  /** Short note under the title, e.g. `5 roles since 2014`. */
  caption?: string;
  children: ReactNode;
};

/**
 * A homepage section: the numbered title sits in the left column (sticky on
 * large screens, so it stays in view through long sections) and the content
 * in the right one, aligned with the hero above.
 */
export default function Section({ id, caption, children }: Props) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn(
        homeGridClassName,
        "scroll-mt-(--navbar-height) border-t border-dashed py-16 lg:py-20",
      )}
    >
      <header className="space-y-2 lg:sticky lg:top-[calc(var(--navbar-height)+2.5rem)] lg:self-start">
        <p className="text-primary font-mono text-xs tracking-widest">
          {sectionNumber(id)}
        </p>
        <h2 id={titleId} className="text-3xl font-semibold tracking-tight">
          {HOME_SECTIONS[id]}
        </h2>
        {caption && <p className="text-muted-foreground text-sm">{caption}</p>}
      </header>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
