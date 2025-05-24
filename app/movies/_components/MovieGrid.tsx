import LoadingSpinner from "@/app/_components/LoadingSpinner";
import { routes } from "@/lib/constants";
import { MovieFilters, MovieWithMetadata } from "@/lib/movies/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { MovieCard } from "./MovieCard";
import MovieGridSkeleton from "./MovieGridSkeleton";

type Props = {
  onMovieClicked: (movie: MovieWithMetadata) => void;
};

export default function MoviesGrid({ onMovieClicked }: Props) {
  const form = useFormContext<MovieFilters>();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [debouncedFilters, setDebouncedFilters] = useState<MovieFilters>(
    form.getValues(),
  );

  // Watch for filter changes
  const filters = useWatch({
    control: form.control,
  });

  // Apply debouncing to filter changes
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500); // 500ms debounce delay

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [filters]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
  } = useInfiniteQuery({
    queryKey: ["movies", debouncedFilters],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetch(
        routes.api.movies({
          cursor: pageParam,
          limit: 16,
          ...debouncedFilters,
        }),
      );
      return response.json();
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    initialPageParam: 0,
  });

  useEffect(() => {
    if (!loadMoreRef.current) return;

    // Disconnect the previous observer if it exists
    observerRef.current?.disconnect();

    // Create new intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "0px 0px 200px 0px" }, // Load more when within 200px of the bottom
    );

    // Observe the load more element
    observerRef.current.observe(loadMoreRef.current);

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Flatten all pages of movies
  const movies = data?.pages.flatMap((page) => page.data) || [];

  if (isPending) {
    return <MovieGridSkeleton />;
  }

  if (isError) {
    return (
      <div className="text-destructive flex items-center justify-center py-10">
        Failed to load movies.
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-destructive flex items-center justify-center py-10">
        Whoops! No movies found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 justify-center gap-6 md:grid-cols-8">
        {movies.map((movieWithMetadata, index) => (
          <MovieCard
            key={`${movieWithMetadata.title}-${index}`}
            movie={movieWithMetadata}
            onClick={() => onMovieClicked(movieWithMetadata)}
          />
        ))}
      </div>

      <div ref={loadMoreRef} className="py-4 text-center">
        {isFetchingNextPage ? (
          <div className="flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : movies.length > 0 && !hasNextPage ? (
          <p className="text-sm text-neutral-500">That's it!</p>
        ) : null}
      </div>
    </div>
  );
}
