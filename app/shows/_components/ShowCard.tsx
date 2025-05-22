"use client";

import { ShowWithMetadata } from "@/lib/shows/types";
import Image from "next/image";

interface ShowCardProps {
  show: ShowWithMetadata;
}

export function ShowCard({ show }: ShowCardProps) {
  const imagePath = show.metadata.poster_path
    ? `https://image.tmdb.org/t/p/w500${show.metadata.poster_path}`
    : null;

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-neutral-100 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="relative aspect-[2/3] w-full">
        {imagePath ? (
          <Image
            src={imagePath}
            alt={show.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-200 dark:bg-neutral-800">
            <span className="text-neutral-500 dark:text-neutral-400">
              No image
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
