import { describe, expect, it } from "vitest";
import { isRateLimited } from "@/lib/contact/rate-limit";

describe("isRateLimited", () => {
  it("allows 5 calls and blocks the 6th", () => {
    const key = "key-allows-five";
    const now = Date.now();

    for (let i = 0; i < 5; i++) {
      expect(isRateLimited(key, now)).toBe(false);
    }

    expect(isRateLimited(key, now)).toBe(true);
  });

  it("frees the key once the window has passed", () => {
    const key = "key-window-resets";
    const now = Date.now();

    for (let i = 0; i < 5; i++) {
      expect(isRateLimited(key, now)).toBe(false);
    }
    expect(isRateLimited(key, now)).toBe(true);

    const afterWindow = now + 60 * 60 * 1000 + 1;
    expect(isRateLimited(key, afterWindow)).toBe(false);
  });

  it("tracks distinct keys independently", () => {
    const now = Date.now();
    const keyA = "key-a";
    const keyB = "key-b";

    for (let i = 0; i < 5; i++) {
      expect(isRateLimited(keyA, now)).toBe(false);
    }

    expect(isRateLimited(keyA, now)).toBe(true);
    expect(isRateLimited(keyB, now)).toBe(false);
  });
});
