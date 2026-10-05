import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

type Props = {
  href: string;
  className?: string;
  children: string;
};

/**
 * Link that opens in a new tab, marked with a trailing arrow. The arrow is
 * kept on the same line as the last word, so long names wrap like normal text
 * without leaving the arrow alone on a line.
 */
export default function ExternalLink({ href, className, children }: Props) {
  const lastSpace = children.lastIndexOf(" ");
  const head = children.slice(0, lastSpace + 1);
  const lastWord = children.slice(lastSpace + 1);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("link", className)}
    >
      {head}
      <span className="whitespace-nowrap">
        {lastWord}
        <ArrowUpRight
          aria-hidden="true"
          className="ml-0.5 inline size-[0.9em] align-[-0.1em]"
        />
      </span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
