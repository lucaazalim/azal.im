"use client";

import { Button } from "@/components/ui/button";
import { ShowRecommended, ShowWithMetadata } from "@/lib/shows/types";
import { cn } from "@/lib/utils";
import {
  Info,
  LucideIcon,
  Meh,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";

const recommendedStyles: Record<
  ShowRecommended,
  { icon: LucideIcon; label: string; className: string }
> = {
  favorite: {
    icon: Star,
    label: "Favorite",
    className: "bg-purple-800/30 text-purple-500",
  },
  yes: {
    icon: ThumbsUp,
    label: "Yes",
    className: "bg-green-800/30 text-green-500",
  },
  maybe: {
    icon: Meh,
    label: "Maybe",
    className: "bg-yellow-800/30 text-yellow-500",
  },
  no: {
    icon: ThumbsDown,
    label: "No",
    className: "bg-red-800/30 text-red-500",
  },
};

type ShowCardProps = {
  show: ShowWithMetadata;
};

export function ShowCard({ show }: ShowCardProps) {
  const imagePath = show.metadata.poster_path
    ? `https://image.tmdb.org/t/p/w500${show.metadata.poster_path}`
    : null;

  const recommendedStyle = recommendedStyles[show.recommended];

  return (
    <div className="flex flex-col rounded-lg overflow-hidden bg-neutral-800">
      <div className="relative aspect-2/3 w-full">
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
      <div className="flex flex-row gap-2 p-3">
        <div
          className={cn(
            recommendedStyle.className,
            "flex flex-row items-center gap-1.5 rounded-lg px-2 py-1 grow font-semibold"
          )}
        >
          <recommendedStyle.icon className="size-4" />
          <span>{recommendedStyle.label}</span>
        </div>
        <Button variant="outline">
          <Info />
        </Button>
      </div>
    </div>
  );
}
