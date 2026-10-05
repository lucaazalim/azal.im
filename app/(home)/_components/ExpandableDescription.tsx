"use client";

import { bulletClassName } from "@/app/(home)/_components/home";
import RichText from "@/app/_components/RichText";
import { Description } from "@/lib/experiences/types";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

/** Highlights shown before the "Show more" toggle. */
const VISIBLE_HIGHLIGHTS = 3;

/**
 * An entry's description, collapsed LinkedIn-style to its first paragraph and
 * first few highlights. Everything is rendered up front (and only hidden), so
 * the full text is still in the page for search engines.
 */
export default function ExpandableDescription({
  description,
}: {
  description: Description;
}) {
  const id = useId();
  const [expanded, setExpanded] = useState(false);
  const { paragraphs, highlights } = description;

  const hiddenCount =
    paragraphs.length - 1 + Math.max(0, highlights.length - VISIBLE_HIGHLIGHTS);
  const collapsed = !expanded && hiddenCount > 0;

  return (
    <div className="space-y-3">
      <div
        id={id}
        className="text-muted-foreground space-y-3 text-sm leading-relaxed"
      >
        {paragraphs.map((paragraph, index) => (
          <p key={index} hidden={collapsed && index > 0}>
            <RichText text={paragraph} />
          </p>
        ))}
        {highlights.length > 0 && (
          <ul className="space-y-2">
            {highlights.map((highlight, index) => (
              <li
                key={index}
                hidden={collapsed && index >= VISIBLE_HIGHLIGHTS}
                className={bulletClassName}
              >
                <RichText text={highlight} />
              </li>
            ))}
          </ul>
        )}
      </div>
      {hiddenCount > 0 && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={id}
          onClick={() => setExpanded((value) => !value)}
          className="text-muted-foreground hover:text-primary inline-flex items-center gap-1 font-mono text-xs tracking-wider uppercase transition-colors"
        >
          {expanded ? "Show less" : "Show more"}
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "size-3.5 transition-transform",
              expanded && "rotate-180",
            )}
          />
        </button>
      )}
    </div>
  );
}
