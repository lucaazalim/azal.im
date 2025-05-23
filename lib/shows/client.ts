import { PaginatedResponse } from "../types";
import { ShowsRequest, ShowWithMetadata } from "./types";

export async function fetchShows(
  request: ShowsRequest,
): Promise<PaginatedResponse<ShowWithMetadata>> {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(request)) {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, value.toString());
    }
  }

  const response = await fetch(`/api/shows?${params.toString()}`);
  return response.json();
}
