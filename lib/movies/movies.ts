import rawMetadata from "@/data/movies-metadata.json";
import rawMovies from "@/data/movies.json";
import { loadCollection } from "@/lib/data/load";
import { PaginatedResponse } from "../types";
import { findMovieMetadata } from "./helpers";
import {
  Movie,
  movieMetadataSchema,
  MoviesRequest,
  movieSchema,
  MovieWithMetadata,
} from "./types";

export const { moviesWithMetadata, genres, totalMovies, totalRuntime } =
  loadMoviesWithMetadata();

export function loadMoviesWithMetadata(): {
  moviesWithMetadata: MovieWithMetadata[];
  genres: string[];
  totalMovies: number;
  totalRuntime: number;
} {
  const movies = loadCollection(rawMovies, movieSchema, "movies");
  assertNoDuplicateMovies(movies);

  const metadata = loadCollection(
    rawMetadata,
    movieMetadataSchema,
    "movie metadata",
  );

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
    genres,
    totalMovies: movies.length,
    totalRuntime: moviesWithMetadata.reduce(
      (total, movie) => total + (movie.metadata.runtime ?? 0),
      0,
    ),
  };
}

/**
 * Each title appears once in `data/movies.json` (title + year identify it,
 * and the movies grid uses that pair as its React key). Rewatches update the
 * existing entry instead of adding a new one.
 */
export function assertNoDuplicateMovies(movies: Movie[]): void {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const movie of movies) {
    const key = `${movie.title} (${movie.year})`;
    if (seen.has(key)) duplicates.add(key);
    seen.add(key);
  }

  if (duplicates.size > 0) {
    throw new Error(`Duplicate movies data: ${[...duplicates].join("; ")}`);
  }
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

  const runtimeMin = runtime?.min;
  const runtimeMax = runtime?.max;

  if (runtimeMin !== undefined && runtimeMin > 0) {
    filteredMovies = filteredMovies.filter(
      ({ metadata: { runtime: movieRuntime } }) =>
        movieRuntime !== null && movieRuntime >= runtimeMin,
    );
  }

  if (runtimeMax !== undefined) {
    filteredMovies = filteredMovies.filter(
      ({ metadata: { runtime: movieRuntime } }) =>
        movieRuntime !== null && movieRuntime <= runtimeMax,
    );
  }

  return {
    data: filteredMovies.slice(cursor, cursor + limit),
    nextCursor: Math.min(cursor + limit, filteredMovies.length),
    hasMore: cursor + limit < filteredMovies.length,
  };
}
