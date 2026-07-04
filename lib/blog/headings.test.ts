import { describe, expect, it } from "vitest";
import { extractHeadings, slugify } from "@/lib/blog/headings";

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
