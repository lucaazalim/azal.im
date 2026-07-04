import { describe, expect, it } from "vitest";
import { escapeHtml } from "@/lib/contact/escape";

describe("escapeHtml", () => {
  it("escapes the five HTML metacharacters", () => {
    expect(escapeHtml(`&<>"'`)).toBe("&amp;&lt;&gt;&quot;&#39;");
  });

  it("escapes a script injection attempt", () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe(
      "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;",
    );
  });

  it("leaves plain text unchanged", () => {
    expect(escapeHtml("Hello, this is a normal message.")).toBe(
      "Hello, this is a normal message.",
    );
  });
});
