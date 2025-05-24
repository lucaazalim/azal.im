import { PaginatedResponse } from "../types";
import { MoviesRequest, MovieWithMetadata } from "./types";

export async function fetchMovies(
  request: MoviesRequest,
): Promise<PaginatedResponse<MovieWithMetadata>> {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(request)) {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, value.toString());
    }
  }

  const response = await fetch(`/api/movies?${params.toString()}`);
  return response.json();
}
