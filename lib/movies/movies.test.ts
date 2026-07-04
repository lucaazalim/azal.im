import { describe, expect, it } from "vitest";
import { getMovies, moviesWithMetadata } from "@/lib/movies/movies";

describe("getMovies", () => {
  it("paginates using cursor and limit", () => {
    const result = getMovies({ cursor: 0, limit: 5 });

    expect(result.data).toHaveLength(5);
    expect(result.nextCursor).toBe(5);
    expect(result.hasMore).toBe(true);
  });

  it("returns an empty page once the cursor is past the end", () => {
    const result = getMovies({
      cursor: moviesWithMetadata.length,
      limit: 5,
    });

    expect(result.data).toEqual([]);
    expect(result.hasMore).toBe(false);
  });

  it("filters by exact star rating", () => {
    const result = getMovies({ cursor: 0, limit: 10, stars: 5 });

    expect(result.data.length).toBeGreaterThan(0);
    for (const movie of result.data) {
      expect(movie.stars).toBe(5);
    }
  });

  it("filters by title substring, case-insensitively", () => {
    const target = moviesWithMetadata[0].title;

    const result = getMovies({ cursor: 0, limit: 10, title: target });

    expect(result.data.length).toBeGreaterThan(0);
    for (const movie of result.data) {
      expect(movie.title.toLowerCase()).toContain(target.toLowerCase());
    }
  });
});
