import { PaginatedResponse } from "../types";
import { ShowFilters, ShowWithMetadata } from "./types";

export async function fetchShows({
  pageParam,
  filters = {},
}: {
  pageParam: number;
  filters?: ShowFilters;
}): Promise<PaginatedResponse<ShowWithMetadata>> {
  const params = new URLSearchParams({
    cursor: pageParam.toString(),
    limit: "24",
  });

  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null) {
      params.append(key, value.toString());
    }
  }

  const response = await fetch(`/api/shows?${params.toString()}`);
  return response.json();
}
