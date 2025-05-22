"use client";

import { PaginatedResponse, ShowWithMetadata } from "@/lib/shows/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { ShowCard } from "./ShowCard";

async function fetchShows({
  pageParam,
}: {
  pageParam: number;
}): Promise<PaginatedResponse<ShowWithMetadata>> {
  const response = await fetch("/api/shows?cursor=" + pageParam);
  return response.json();
}

export default function ShowsGrid() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["shows"],
    queryFn: fetchShows,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  useEffect(() => {
    if (!loadMoreRef.current) return;

    // Disconnect previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "0px 0px 200px 0px" } // Load more when within 200px of the bottom
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

  // Flatten all pages of shows
  const shows = data?.pages.flatMap((page) => page.data) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        Loading shows...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-10 text-red-500">
        Failed to load shows
      </div>
    );
  }

  if (shows.length === 0) {
    return (
      <div className="flex items-center justify-center py-10">
        No shows found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8">
        {shows.map((show, index) => (
          <ShowCard key={`${show.title}-${index}`} show={show} />
        ))}
      </div>

      {/* Loading more indicator */}
      <div ref={loadMoreRef} className="py-4 text-center">
        {isFetchingNextPage ? (
          <p className="text-sm text-neutral-500">Loading more shows...</p>
        ) : hasNextPage ? (
          <p className="text-sm text-neutral-500">Scroll to load more</p>
        ) : shows.length > 0 ? (
          <p className="text-sm text-neutral-500">You've seen all shows</p>
        ) : null}
      </div>
    </div>
  );
}
