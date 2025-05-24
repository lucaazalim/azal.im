"use client";

import { Button } from "@/components/ui/button";
import { MovieWithMetadata } from "@/lib/movies/types";
import { ImageOff, Info } from "lucide-react";
import Image from "next/image";
import Stars from "./Stars";

type ShowCardProps = {
  movie: MovieWithMetadata;
  onClick: () => void;
};

export function MovieCard({ movie, onClick }: ShowCardProps) {
  const imagePath = movie.metadata.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.metadata.poster_path}`
    : null;

  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-neutral-800">
      <div className="relative aspect-2/3 w-full">
        {imagePath ? (
          <Image
            src={imagePath}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-200 dark:bg-neutral-800">
            <span className="flex flex-col items-center gap-3 opacity-50">
              <ImageOff className="size-10" />
              <span className="font-semibold">{movie.title}</span>
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between gap-2 p-3">
        <Stars stars={movie.stars} />
        <Button variant="outline" onClick={onClick}>
          <Info />
        </Button>
      </div>
    </div>
  );
}
