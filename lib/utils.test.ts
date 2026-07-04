import { describe, expect, it } from "vitest";
import { objectToSearchParams, searchParamsToObject } from "@/lib/utils";

describe("searchParamsToObject / objectToSearchParams", () => {
  it("round-trips a flat object", () => {
    const obj = { title: "Inception", type: "movie" };
    const params = objectToSearchParams(obj);
    expect(searchParamsToObject(params)).toEqual(obj);
  });

  it("round-trips a nested object using dot-notation", () => {
    const obj = { runtime: { min: 1, max: 2 } };
    const params = objectToSearchParams(obj);
    expect(params.toString()).toBe("runtime.min=1&runtime.max=2");
    expect(searchParamsToObject(params)).toEqual({
      runtime: { min: "1", max: "2" },
    });
  });

  it("drops undefined and empty-string values", () => {
    const obj = { title: "Dune", subtitle: undefined, genre: "" };
    const params = objectToSearchParams(obj);
    expect(searchParamsToObject(params)).toEqual({ title: "Dune" });
  });

  it("turns duplicate keys into arrays", () => {
    const obj = { genre: ["Action", "Drama"] };
    const params = objectToSearchParams(obj);
    expect(params.getAll("genre")).toEqual(["Action", "Drama"]);
    expect(searchParamsToObject(params)).toEqual({
      genre: ["Action", "Drama"],
    });
  });

  it("stringifies leaf values rather than restoring types", () => {
    const obj = { limit: 10, active: true };
    const params = objectToSearchParams(obj);
    expect(searchParamsToObject(params)).toEqual({
      limit: "10",
      active: "true",
    });
  });

  it("builds nested arrays into repeated dot-notation keys", () => {
    const params = new URLSearchParams();
    params.append("genre", "Action");
    params.append("genre", "Comedy");
    expect(searchParamsToObject(params)).toEqual({
      genre: ["Action", "Comedy"],
    });
  });
});
