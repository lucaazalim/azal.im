import React, { ReactNode } from "react";

export type PostHeading = {
  slug: string;
  title: string;
  level: number;
};

export function textFromChildren(children: ReactNode): string {
  if (children == null || typeof children === "boolean") return "";
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) return children.map(textFromChildren).join("");
  if (React.isValidElement<{ children?: ReactNode }>(children)) {
    return textFromChildren(children.props.children);
  }
  return "";
}

export function createHeading(level: number) {
  const Heading = ({ children }: { children: ReactNode }) => {
    const slug = slugify(textFromChildren(children));

    return React.createElement(
      `h${level}`,
      { id: slug, className: "scroll-mt-24" },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
        }),
      ],
      children,
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

export function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .normalize("NFD") // Decompose accents into their base characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
    .trim() // Remove whitespace from both ends of the string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/--+/g, "-"); // Replace multiple - with single -
}

function stripInlineMarkdown(title: string): string {
  return title
    .replace(/`([^`]*)`/g, "$1") // inline code
    .replace(/\*\*([^*]*)\*\*/g, "$1") // bold
    .replace(/\*([^*]*)\*/g, "$1") // italic
    .replace(/_([^_]*)_/g, "$1") // underscore emphasis
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1"); // links → text
}

export function extractHeadings(source: string): PostHeading[] {
  const headings: PostHeading[] = [];

  // match the `#` syntax for headings
  const headingMatcher = /^(#+)\s(.+)$/;

  let inFence = false;

  for (const line of source.split("\n")) {
    if (line.trimStart().startsWith("```")) {
      inFence = !inFence;
      continue;
    }

    if (inFence) continue;

    const match = headingMatcher.exec(line);

    if (match === null) continue;

    const level = match[1].length;
    const title = stripInlineMarkdown(match[2].trim());
    const slug = slugify(title);

    headings.push({ slug, title, level });
  }

  return headings;
}
