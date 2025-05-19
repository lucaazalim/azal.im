import chalk from "chalk";
import dotenv from "dotenv";
import { distance } from "fastest-levenshtein";
import fs from "fs";
import path from "path";
import { z } from "zod";

// Load environment variables from .env file
dotenv.config({ path: path.resolve("../.env") });

// File paths
const filePath = path.resolve("movies.json");
const metadataFilePath = path.resolve("metadata.json");

// API keys
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// TMDB API endpoints
const TMDB_MOVIE_URL =
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";
const TMDB_TV_URL =
  "https://api.themoviedb.org/3/search/tv?include_adult=false&language=en-US&page=1";
const TMDB_MOVIE_GENRES_URL =
  "https://api.themoviedb.org/3/genre/movie/list?language=en";
const TMDB_TV_GENRES_URL =
  "https://api.themoviedb.org/3/genre/tv/list?language=en";

const ShowSchema = z.object({
  watched_at: z
    .string()
    .regex(/^\d{2}-\d{4}$/)
    .optional(),
  title: z.string().min(1),
  platform: z
    .enum([
      "Netflix",
      "Cinema",
      "YouTube",
      "Popcorn Time",
      "HBO GO",
      "Prime",
      "Telecine",
      "Stremio",
      "Disney+",
      "HBO Max",
      "Globoplay",
      "Apple TV+",
      "Star+",
      "TV",
    ])
    .optional(),
  type: z.enum(["movie", "series", "documentary", "miniseries"]),
  year: z.number().min(1900).max(new Date().getFullYear()),
  recommended: z.enum(["yes", "no", "maybe", "favorite"]),
});

type Show = z.infer<typeof ShowSchema>;

type TMDBEntry = {
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

type MetadataEntry = {
  title: string;
  original_title: string;
  language: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  release_date: string;
  genres: string[];
};

function loadMetadata(filePath: string): MetadataEntry[] {
  if (!fs.existsSync(filePath)) {
    console.log("metadata.json does not exist. Creating a new file.");
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    return [];
  }

  const content = fs.readFileSync(filePath, "utf-8");
  return content ? JSON.parse(content) : [];
}

function saveMetadata(filePath: string, data: MetadataEntry[]): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log("Metadata saved to metadata.json");
}

async function fetchFromTMDB({
  title,
  year,
  type,
}: Show): Promise<TMDBEntry | null> {
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
  if (data.results && data.results.length > 0) {
    return data.results[0];
  } else {
    console.log(chalk.red(`No results found for ${title}.`));
    return null;
  }
}

async function fetchGenres(
  isMovie: boolean
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
  genres: { id: number; name: string }[]
): MetadataEntry {
  const genreNames = entry.genre_ids
    .map((id) => {
      const genre = genres.find((g) => g.id === id);
      return genre ? genre.name : "";
    })
    .filter((name) => name !== "");

  return {
    title: entry.title || entry.name || "",
    original_title: entry.original_title || entry.original_name || "",
    language: entry.original_language || "",
    overview: entry.overview || "",
    backdrop_path: entry.backdrop_path,
    poster_path: entry.poster_path,
    release_date: entry.release_date || entry.first_air_date || "",
    genres: genreNames,
  };
}

function yearFromDate(date: string): number {
  return Number(date.split("-")[0]);
}

function compareShowTitles(title1: string, title2: string): boolean {
  const normalizedTitle1 = title1.trim().toLowerCase();
  const normalizedTitle2 = title2.trim().toLowerCase();

  const maxLength = Math.max(normalizedTitle1.length, normalizedTitle2.length);
  if (maxLength === 0) return true;

  const similarity =
    1 - distance(normalizedTitle1, normalizedTitle2) / maxLength;

  return similarity >= 0.8;
}

function compareShowYears(year1: number, year2: number): boolean {
  return Math.abs(year1 - year2) <= 1;
}

async function fetchMovieMetadata() {
  const rawMovies = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const movies: Show[] = [];

  for (const movie of rawMovies) {
    try {
      movies.push(ShowSchema.parse(movie));
    } catch (error) {
      console.error(
        chalk.red(`Invalid movie entry: ${JSON.stringify(movie)} @ ${error}`)
      );
      return;
    }
  }

  console.log("Fetching movie genres...");
  const movieGenres = await fetchGenres(true);
  console.log("Fetching TV genres...");
  const tvGenres = await fetchGenres(false);

  console.log("Loading existing metadata for cache lookup...");
  const metadata = loadMetadata(metadataFilePath);

  const findInCache = (show: Show): MetadataEntry | undefined =>
    metadata.find((entry) => {
      const titlesMatch =
        compareShowTitles(entry.title, show.title) ||
        compareShowTitles(entry.original_title, show.title);

      const yearsMatch = compareShowYears(
        yearFromDate(entry.release_date),
        show.year
      );

      return titlesMatch && yearsMatch;
    });

  let failed = 0;

  for (const [index, movie] of movies.entries()) {
    const cachedData = findInCache(movie);

    if (cachedData) {
      continue;
    }

    try {
      console.log(
        `Fetching metadata for movie ${index + 1}/${movies.length}: ${movie.title}`
      );

      const tmdbEntry = await fetchFromTMDB(movie);

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
          chalk.red(`No title found in TMDB entry for ${movie.title}.`)
        );
        failed++;
        continue;
      }

      if (
        !compareShowTitles(movie.title, tmdbEntryOriginalTitle) &&
        !compareShowTitles(movie.title, tmdbEntryTitle)
      ) {
        console.log(
          chalk.yellow(
            `Title mismatch for ${movie.title}. TMDB returned ${tmdbEntry.original_title || tmdbEntry.original_name}.`
          )
        );
        failed++;
        continue;
      }

      const tmdbEntryYear = yearFromDate(
        tmdbEntry.release_date || tmdbEntry.first_air_date || ""
      );

      if (!tmdbEntryYear) {
        console.log(
          chalk.red(`No release date found in TMDB entry for ${movie.title}.`)
        );
        failed++;
        continue;
      }

      if (!compareShowYears(movie.year, tmdbEntryYear)) {
        console.log(
          chalk.yellow(
            `Year mismatch for ${movie.title}. TMDB returned ${tmdbEntryYear}.`
          )
        );
        failed++;
        continue;
      }

      const metadataEntry = formatMetadataEntry(
        tmdbEntry,
        movie.type === "movie" ? movieGenres : tvGenres
      );

      metadata.push(metadataEntry);
    } catch (error) {
      console.error(`Failed to fetch metadata for ${movie.title}:`, error);
    }
  }

  metadata.sort((a, b) => a.title.localeCompare(b.title));

  saveMetadata(metadataFilePath, metadata);

  console.log(
    "All metadata has been fetched, formatted, and saved to metadata.json."
  );

  console.log(
    chalk.red(
      `Failed to fetch metadata for ${failed} movies. Please check the logs for details.`
    )
  );
}

fetchMovieMetadata();
