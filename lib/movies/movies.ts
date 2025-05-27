import path from "path";
import { PaginatedResponse } from "../types";
import { findMovieMetadata, loadMetadata, loadMovies } from "./helpers";
import { MoviesRequest, MovieWithMetadata } from "./types";

const MOVIES_PATH = path.join(process.cwd(), "data/movies/movies.json");
const METADATA_PATH = path.join(process.cwd(), "data/movies/metadata.json");

export const { moviesWithMetadata, totalMovies, genres } =
  loadMoviesWithMetadata();

export function loadMoviesWithMetadata(): {
  moviesWithMetadata: MovieWithMetadata[];
  totalMovies: number;
  genres: string[];
} {
  const movies = loadMovies(MOVIES_PATH);
  const metadata = loadMetadata(METADATA_PATH);

  const moviesWithMetadata = movies
    .map((movie) => {
      const metadataEntry = findMovieMetadata(movie, metadata);
      if (metadataEntry) return { ...movie, metadata: metadataEntry };
    })
    .filter((movie) => movie !== undefined)
    .sort(
      (a, b) => (b.watchedAt?.getTime() ?? 0) - (a.watchedAt?.getTime() ?? 0),
    );

  const genres = moviesWithMetadata
    .flatMap((movie) => movie.metadata.genres)
    .filter((genre, index, self) => self.indexOf(genre) === index)
    .sort((a, b) => a.localeCompare(b));

  return {
    moviesWithMetadata,
    totalMovies: movies.length,
    genres,
  };
}

export function getMovies({
  cursor,
  limit = 10,
  title,
  type,
  stars,
  genre,
  runtime,
}: MoviesRequest): PaginatedResponse<MovieWithMetadata> {
  let filteredMovies = [...moviesWithMetadata];

  if (title) {
    const searchTitle = title.toLowerCase();
    filteredMovies = filteredMovies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTitle),
    );
  }

  if (type) {
    filteredMovies = filteredMovies.filter((movie) => movie.type === type);
  }

  if (stars) {
    filteredMovies = filteredMovies.filter((movie) => movie.stars === stars);
  }

  if (genre) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.metadata.genres.includes(genre),
    );
  }

  if (runtime) {
    filteredMovies = filteredMovies.filter(
      ({ metadata: { runtime: movieRuntime } }) =>
        movieRuntime !== null && movieRuntime <= runtime,
    );
  }

  return {
    data: filteredMovies.slice(cursor, cursor + limit),
    nextCursor: Math.min(cursor + limit, filteredMovies.length),
    hasMore: cursor + limit < filteredMovies.length,
  };
}
