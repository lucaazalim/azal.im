import { readFileSync } from "fs";
import path from "path";
import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { extractHeadings, slugify, textFromChildren } from "@/lib/blog/headings";

function readPost(filename: string): string {
  return readFileSync(
    path.join(process.cwd(), "data", "posts", filename),
    "utf-8",
  );
}

describe("slugify", () => {
  it("lowercases and hyphenates words", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("strips accents from unicode input", () => {
    expect(slugify("Configuração")).toBe("configuracao");
  });

  it("replaces & with -and-", () => {
    expect(slugify("Rock & Roll")).toBe("rock-and-roll");
  });

  it("collapses repeated hyphens into one", () => {
    expect(slugify("Foo -- Bar")).toBe("foo-bar");
  });

  it("removes non-word characters other than hyphens", () => {
    expect(slugify("What's up?!")).toBe("whats-up");
  });
});

describe("extractHeadings", () => {
  it("extracts level, title, and slug for each heading", () => {
    const source = [
      "# Introduction",
      "",
      "Some paragraph text.",
      "",
      "## Getting Started",
      "",
      "### Configuração Inicial",
    ].join("\n");

    expect(extractHeadings(source)).toEqual([
      { level: 1, title: "Introduction", slug: "introduction" },
      { level: 2, title: "Getting Started", slug: "getting-started" },
      {
        level: 3,
        title: "Configuração Inicial",
        slug: "configuracao-inicial",
      },
    ]);
  });

  it("returns an empty array when there are no headings", () => {
    expect(extractHeadings("Just a plain paragraph.\nNo headings here.")).toEqual(
      [],
    );
  });

  it("ignores non-heading lines starting with # inside a sentence", () => {
    const source = "Not a #heading because no space follows.\n## Real Heading";
    expect(extractHeadings(source)).toEqual([
      { level: 2, title: "Real Heading", slug: "real-heading" },
    ]);
  });
});

describe("extractHeadings characterization (real posts)", () => {
  it("produces the current slug/level list for duplication-of-knowledge-in-software-engineering.mdx", () => {
    const source = readPost(
      "duplication-of-knowledge-in-software-engineering.mdx",
    );

    expect(
      extractHeadings(source).map(({ slug, level }) => ({ slug, level })),
    ).toEqual([
      { slug: "documentation-as-duplicated-knowledge", level: 1 },
      { slug: "code-comments-as-duplicated-knowledge", level: 1 },
      { slug: "a-broader-principle", level: 1 },
    ]);
  });

  it("produces the current slug/level list for from-multirepo-to-monorepo.mdx", () => {
    const source = readPost("from-multirepo-to-monorepo.mdx");

    expect(
      extractHeadings(source).map(({ slug, level }) => ({ slug, level })),
    ).toEqual([
      { slug: "merging-repositories-while-maintaining-history", level: 1 },
    ]);
  });

  it("produces the current slug/level list for skip-microservices-at-start.mdx", () => {
    const source = readPost("skip-microservices-at-start.mdx");

    expect(
      extractHeadings(source).map(({ slug, level }) => ({ slug, level })),
    ).toEqual([
      { slug: "the-illusion-of-microservice-superpowers", level: 1 },
      { slug: "monoliths-arent-evil-just-misunderstood", level: 1 },
      { slug: "pros-of-monoliths", level: 2 },
      { slug: "cons", level: 2 },
      { slug: "microservices-power-at-a-cost", level: 1 },
      { slug: "3-reasons-to-avoid-microservices-at-the-start", level: 1 },
      { slug: "1-too-much-complexity-too-soon", level: 2 },
      { slug: "2-theyre-not-for-everyone", level: 2 },
      { slug: "3-you-dont-know-the-domain-yet", level: 2 },
      { slug: "the-smarter-path-modular-monoliths", level: 1 },
      { slug: "evolve-dont-overengineer", level: 1 },
    ]);
  });
});

describe("textFromChildren", () => {
  it("returns a string as itself", () => {
    expect(textFromChildren("Hello")).toBe("Hello");
  });

  it("stringifies a number", () => {
    expect(textFromChildren(42)).toBe("42");
  });

  it("returns an empty string for null, undefined, and booleans", () => {
    expect(textFromChildren(null)).toBe("");
    expect(textFromChildren(undefined)).toBe("");
    expect(textFromChildren(true)).toBe("");
    expect(textFromChildren(false)).toBe("");
  });

  it("concatenates an array of string and element children", () => {
    const children = [
      "Using ",
      createElement("code", { key: "code" }, "fetch"),
    ];

    expect(textFromChildren(children)).toBe("Using fetch");
  });

  it("recurses into nested elements", () => {
    const children = createElement(
      "strong",
      null,
      "bold ",
      createElement("em", null, "and italic"),
    );

    expect(textFromChildren(children)).toBe("bold and italic");
  });
});

describe("agreement between rendered and source slug paths", () => {
  it("produces the same slug for a heading with inline code and bold markup", () => {
    const markdownLine = "## Using `fetch` in **Next.js**";
    const renderedChildren = [
      "Using ",
      createElement("code", { key: "code" }, "fetch"),
      " in ",
      createElement("strong", { key: "strong" }, "Next.js"),
    ];

    const sourceSlug = extractHeadings(markdownLine)[0].slug;
    const renderedSlug = slugify(textFromChildren(renderedChildren));

    expect(sourceSlug).toBe(renderedSlug);
  });
});

describe("extractHeadings fence skipping", () => {
  it("ignores lines starting with # inside a fenced code block", () => {
    const source = [
      "# Real Heading",
      "",
      "```bash",
      "# comment, not a heading",
      "echo hi",
      "```",
      "",
      "## Another Real Heading",
    ].join("\n");

    expect(extractHeadings(source)).toEqual([
      { level: 1, title: "Real Heading", slug: "real-heading" },
      {
        level: 2,
        title: "Another Real Heading",
        slug: "another-real-heading",
      },
    ]);
  });
});
