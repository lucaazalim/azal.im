import React from "react";

export type PostHeading = {
  slug: string;
  title: string;
  level: number;
};

export function createHeading(level: number) {
  const Heading = ({ children }: { children: any }) => {
    const slug = slugify(children);

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

export function extractHeadings(source: string): PostHeading[] {
  const headings: PostHeading[] = [];

  // match the `#` syntax for headings
  const headingMatcher = /^(#+)\s(.+)$/gm;

  let match = headingMatcher.exec(source);

  while (match !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const slug = slugify(title);

    headings.push({ slug, title, level });
    match = headingMatcher.exec(source);
  }

  return headings;
}
