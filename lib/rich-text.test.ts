import { describe, expect, it } from "vitest";
import { parseRichText, toPlainText } from "./rich-text";

describe("parseRichText", () => {
  it("returns a single plain segment when there is no markup", () => {
    expect(parseRichText("Hello world")).toEqual([
      { text: "Hello world", bold: false },
    ]);
  });

  it("returns no segments for an empty string", () => {
    expect(parseRichText("")).toEqual([]);
  });

  it("splits bold markers into segments", () => {
    expect(parseRichText("Scaled to **8,115** players")).toEqual([
      { text: "Scaled to ", bold: false },
      { text: "8,115", bold: true },
      { text: " players", bold: false },
    ]);
  });

  it("handles markers at the edges and adjacent markers", () => {
    expect(parseRichText("**.NET 9**, **Next.js**")).toEqual([
      { text: ".NET 9", bold: true },
      { text: ", ", bold: false },
      { text: "Next.js", bold: true },
    ]);
  });

  it("leaves unmatched asterisks untouched", () => {
    expect(parseRichText("a * b ** c")).toEqual([
      { text: "a * b ** c", bold: false },
    ]);
  });
});

describe("toPlainText", () => {
  it("strips bold markers", () => {
    expect(toPlainText("Led **250+** repositories in **Java**.")).toBe(
      "Led 250+ repositories in Java.",
    );
  });
});
