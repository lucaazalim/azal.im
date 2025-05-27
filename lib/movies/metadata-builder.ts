import {
  cleanInvalidMetadataEntries,
  compareMovieTitles,
  compareMovieYears,
  findMovieMetadata,
  loadMovies,
  loadRawMetadata,
  saveMetadata,
} from "@/lib/movies/helpers";
import { Movie, MovieMetadata } from "@/lib/movies/types";
import chalk from "chalk";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve("../../.env") });

// File paths
const MOVIES_PATH = path.join(process.cwd(), "../../data/movies/movies.json");
const METADATA_PATH = path.join(
  process.cwd(),
  "../../data/movies/metadata.json",
);

// API keys
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// TMDB API endpoints
const TMDB_MOVIE_URL =
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";
const TMDB_TV_URL =
  "https://api.themoviedb.org/3/search/tv?include_adult=false&language=en-US&page=1";
const TMDB_MOVIE_DETAILS_URL = "https://api.themoviedb.org/3/movie/";
const TMDB_MOVIE_GENRES_URL =
  "https://api.themoviedb.org/3/genre/movie/list?language=en";
const TMDB_TV_GENRES_URL =
  "https://api.themoviedb.org/3/genre/tv/list?language=en";

type TMDBEntry = {
  id: number;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  overview: string;
  poster_path: string;
  // Movie
  title?: string;
  original_title?: string;
  release_date?: string;
  // TV
  name?: string;
  original_name?: string;
  first_air_date?: string;
};

type TMDBMovieDetailsEntry = {
  runtime: number;
};

async function searchMovieInTMDB({
  title,
  year,
  type,
}: Movie): Promise<TMDBEntry | null> {
  const url =
    type === "movie"
      ? `${TMDB_MOVIE_URL}&query=${encodeURIComponent(title)}&year=${year}`
      : `${TMDB_TV_URL}&query=${encodeURIComponent(title)}&first_air_date_year=${year}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.results?.[0] || null;
}

async function fetchMovieDetailsInTMDB(
  movieId: number,
): Promise<TMDBMovieDetailsEntry | null> {
  const url = `${TMDB_MOVIE_DETAILS_URL}${movieId}?language=en-US`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

async function fetchTMDBGenres(
  isMovie: boolean,
): Promise<{ id: number; name: string }[]> {
  const url = isMovie ? TMDB_MOVIE_GENRES_URL : TMDB_TV_GENRES_URL;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.genres || [];
}

function formatMetadataEntry(
  entry: TMDBEntry,
  detailsEntry: TMDBMovieDetailsEntry | null,
  genres: { id: number; name: string }[],
): MovieMetadata {
  const genreNames = entry.genre_ids
    .map((id) => {
      const genre = genres.find((g) => g.id === id);
      return genre ? genre.name : "";
    })
    .filter((name) => name !== "");

  const releaseDate = entry.release_date || entry.first_air_date;

  return {
    title: entry.title || entry.name || "",
    original_title: entry.original_title || entry.original_name || "",
    language: entry.original_language || "",
    overview: entry.overview || "",
    backdrop_path: entry.backdrop_path,
    poster_path: entry.poster_path,
    release_date: new Date(releaseDate!),
    runtime: detailsEntry?.runtime || null,
    genres: genreNames,
  };
}

async function fetchMovieMetadata() {
  console.log("Loading movies from file...");
  const movies = loadMovies(MOVIES_PATH);

  console.log("Fetching movie genres...");
  const movieGenres = await fetchTMDBGenres(true);

  console.log("Fetching TV genres...");
  const tvGenres = await fetchTMDBGenres(false);

  console.log("Loading existing metadata for cache lookup...");
  const metadata = cleanInvalidMetadataEntries(loadRawMetadata(METADATA_PATH));

  let failed = 0;

  for (const [index, movie] of movies.entries()) {
    const cachedMetadata = findMovieMetadata(movie, metadata);

    if (cachedMetadata) {
      continue;
    }

    try {
      console.log(
        `Fetching metadata for movie ${index + 1}/${movies.length}: ${movie.title}`,
      );

      const tmdbEntry = await searchMovieInTMDB(movie);

      if (!tmdbEntry) {
        console.log(chalk.red(`No TMDB entry found for ${movie.title}.`));
        failed++;
        continue;
      }

      const tmdbEntryOriginalTitle =
        tmdbEntry.original_title || tmdbEntry.original_name;

      const tmdbEntryTitle = tmdbEntry.title || tmdbEntry.name;

      if (!tmdbEntryOriginalTitle || !tmdbEntryTitle) {
        console.log(
          chalk.red(`No title found in TMDB entry for ${movie.title}.`),
        );
        failed++;
        continue;
      }

      if (
        !compareMovieTitles(movie.title, tmdbEntryOriginalTitle) &&
        !compareMovieTitles(movie.title, tmdbEntryTitle)
      ) {
        console.log(
          chalk.yellow(
            `Title mismatch for ${movie.title}. TMDB returned ${tmdbEntry.original_title || tmdbEntry.original_name}.`,
          ),
        );
        failed++;
        continue;
      }

      const tmdbEntryReleaseDate =
        tmdbEntry.release_date || tmdbEntry.first_air_date;

      if (!tmdbEntryReleaseDate) {
        console.log(
          chalk.red(`No release date found in TMDB entry for ${movie.title}.`),
        );
        failed++;
        continue;
      }

      const tmdbEntryYear = new Date(tmdbEntryReleaseDate).getFullYear();

      if (!compareMovieYears(movie.year, tmdbEntryYear)) {
        console.log(
          chalk.yellow(
            `Year mismatch for ${movie.title}. TMDB returned ${tmdbEntryYear}.`,
          ),
        );
        failed++;
        continue;
      }

      const tmdbMovieDetailsEntry =
        movie.type === "movie"
          ? await fetchMovieDetailsInTMDB(tmdbEntry.id)
          : null;

      const metadataEntry = formatMetadataEntry(
        tmdbEntry,
        tmdbMovieDetailsEntry,
        movie.type === "movie" ? movieGenres : tvGenres,
      );

      metadata.push(metadataEntry);
    } catch (error) {
      console.error(`Failed to fetch metadata for ${movie.title}:`, error);
    }
  }

  metadata.sort((a, b) => a.title.localeCompare(b.title));

  saveMetadata(METADATA_PATH, metadata);

  console.log(
    "All metadata has been fetched, formatted, and saved to metadata.json.",
  );

  console.log(
    chalk.red(
      `Failed to fetch metadata for ${failed} movies. Please check the logs for details.`,
    ),
  );
}

fetchMovieMetadata();
