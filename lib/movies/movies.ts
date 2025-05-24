import { distance } from "fastest-levenshtein";
import fs from "fs";
import { z } from "zod";
import { PaginatedResponse } from "../types";
import {
  Movie,
  MovieMetadata,
  movieMetadataSchema,
  movieSchema,
  MoviesRequest,
  MovieWithMetadata,
} from "./types";

const MOVIES_PATH = "./data/movies/movies.json";
const METADATA_PATH = "./data/movies/metadata.json";

let moviesWithMetadata: MovieWithMetadata[];
let genres: string[] = [];

function loadShowData() {
  const moviesRawData = fs.readFileSync(MOVIES_PATH, "utf-8");
  const moviesJson = JSON.parse(moviesRawData);
  const movies = z.array(movieSchema).parse(moviesJson);

  const metadataRawData = fs.readFileSync(METADATA_PATH, "utf-8");
  const metadataJson = JSON.parse(metadataRawData);
  const metadata = z.array(movieMetadataSchema).parse(metadataJson);

  moviesWithMetadata = movies
    .map((movie) => {
      const metadataEntry = findMetadataFromMovie(movie, metadata);
      if (metadataEntry) return { ...movie, metadata: metadataEntry };
    })
    .filter((movie) => movie !== undefined)
    .sort(
      (a, b) => (b.watched_at?.getTime() ?? 0) - (a.watched_at?.getTime() ?? 0),
    );

  genres = moviesWithMetadata
    .flatMap((movie) => movie.metadata.genres)
    .filter((genre, index, self) => self.indexOf(genre) === index)
    .sort((a, b) => a.localeCompare(b));
}

loadShowData();

export function getMovies({
  cursor,
  limit = 10,
  title,
  stars,
  genre,
}: MoviesRequest): PaginatedResponse<MovieWithMetadata> {
  let filteredMovies = [...moviesWithMetadata];

  if (title) {
    const searchTitle = title.toLowerCase();
    filteredMovies = filteredMovies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTitle),
    );
  }

  if (stars) {
    filteredMovies = filteredMovies.filter((movie) => movie.stars === stars);
  }

  if (genre) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.metadata.genres.includes(genre),
    );
  }

  return {
    data: filteredMovies.slice(cursor, cursor + limit),
    nextCursor: Math.min(cursor + limit, filteredMovies.length),
    hasMore: cursor + limit < filteredMovies.length,
  };
}

export function getGenres(): string[] {
  return genres;
}

function compareMovieTitles(title1: string, title2: string): boolean {
  const normalizedTitle1 = title1.trim().toLowerCase();
  const normalizedTitle2 = title2.trim().toLowerCase();

  const maxLength = Math.max(normalizedTitle1.length, normalizedTitle2.length);
  if (maxLength === 0) return true;

  const similarity =
    1 - distance(normalizedTitle1, normalizedTitle2) / maxLength;

  return similarity >= 0.8;
}

function compareMovieYears(year1: number, year2: number): boolean {
  return Math.abs(year1 - year2) <= 1;
}

function findMetadataFromMovie(
  movie: Movie,
  metadata: MovieMetadata[],
): MovieMetadata | undefined {
  return metadata.find((entry) => {
    const titlesMatch =
      compareMovieTitles(entry.title, movie.title) ||
      compareMovieTitles(entry.original_title, movie.title);

    const yearsMatch = compareMovieYears(
      Number(entry.release_date.getFullYear()), // extract year
      movie.year,
    );

    return titlesMatch && yearsMatch;
  });
}

export default {
  getMovies,
};
