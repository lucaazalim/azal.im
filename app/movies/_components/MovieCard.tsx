"use client";

import { MovieWithMetadata } from "@/lib/movies/types";
import { ImageOff } from "lucide-react";
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
    <div
      className="animate-in fade-in bg-accent flex cursor-pointer flex-col overflow-hidden rounded-lg transition-all duration-100 ease-in hover:scale-[102%]"
      onClick={onClick}
    >
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
          <div className="bg-accent flex h-full w-full items-center justify-center">
            <span className="flex flex-col items-center gap-3 opacity-50">
              <ImageOff className="size-10" />
              <span className="font-semibold">{movie.title}</span>
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-center gap-2 p-3">
        <Stars stars={movie.stars} />
      </div>
    </div>
  );
}
