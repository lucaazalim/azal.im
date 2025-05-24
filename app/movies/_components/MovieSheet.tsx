import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { MovieWithMetadata } from "@/lib/movies/types";
import Image from "next/image";
import { Fragment } from "react";
import Stars from "./Stars";

type Props = {
  movie: MovieWithMetadata | undefined;
  onClose: () => void;
};

export default function MovieSheet({ movie, onClose }: Props) {
  const imagePath = movie?.metadata.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.metadata.backdrop_path}`
    : null;

  return (
    <Sheet open={!!movie} onOpenChange={onClose}>
      <SheetContent className="max-w-[90vw] px-10 sm:max-w-[70vw] lg:max-w-[50vw] lg:px-20">
        <SheetHeader className="-z-5 space-y-5 px-0 pt-36 lg:pt-90">
          <SheetTitle className="space-x-2 text-2xl sm:text-4xl">
            <span>{movie?.title}</span>
            <span className="font-thin">
              ({movie && new Date(movie.metadata.release_date).getFullYear()})
            </span>
          </SheetTitle>
        </SheetHeader>
        <div className="object-contain object-top">
          <div className="to-background absolute inset-x-0 inset-y-1 -z-10 aspect-video bg-gradient-to-b from-transparent to-90%" />
          {movie && imagePath && (
            <Image
              src={imagePath}
              alt={movie.title}
              fill
              className="-z-15 object-contain object-top brightness-80"
              sizes="100vw"
            />
          )}
        </div>
        <div className="space-y-10">
          <div className="z-50 grid grid-cols-1 gap-10 xl:grid-cols-[2fr_1fr]">
            <p className="text-foreground/70">{movie?.metadata.overview}</p>
            <div>
              <div>
                <span className="font-bold">Watched at: </span>
                <span>
                  {movie?.watched_at &&
                    new Date(movie.watched_at).toLocaleString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                </span>
              </div>
              <div className="flex flex-row gap-2">
                <span className="font-bold">Genres: </span>
                <div>
                  {movie?.metadata.genres.map((genre, index) => (
                    <Fragment key={genre}>
                      <span>{genre}</span>
                      {movie.metadata.genres.length != index + 1 && (
                        <span>, </span>
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {movie && <Stars stars={movie?.stars} />}
        </div>
      </SheetContent>
    </Sheet>
  );
}
