import LoadingImage from "@/app/_components/LoadingImage";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { MovieWithMetadata } from "@/lib/movies/types";
import { useState } from "react";
import Stars from "./Stars";

type Props = {
  movie: MovieWithMetadata | undefined;
  onClose: () => void;
};

export default function MovieDetailsSheet({ movie, onClose }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const imagePath = movie?.metadata.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.metadata.backdrop_path}`
    : null;

  const runtime = movie?.metadata.runtime
    ? `${Math.floor(movie.metadata.runtime / 60)}h ${movie.metadata.runtime % 60}m`
    : undefined;

  return (
    <Sheet
      open={!!movie}
      onOpenChange={() => {
        setImageLoaded(false);
        onClose();
      }}
    >
      <SheetContent className="max-w-[90vw] px-10 sm:max-w-[70vw] lg:max-w-[50vw] lg:px-20">
        <SheetHeader className="-z-5 px-0 pt-36 lg:pt-90">
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
            <LoadingImage
              src={imagePath}
              alt={movie.title}
              fill
              className="-z-15 object-contain object-top brightness-80"
              sizes="100vw"
            />
          )}
        </div>
        <div className="space-y-10">
          <div className="z-50 grid grid-cols-1 gap-12 xl:grid-cols-[2fr_1fr]">
            <div className="space-y-8">
              {movie?.metadata.overview && (
                <p className="text-foreground/70">{movie?.metadata.overview}</p>
              )}
              {movie && <Stars stars={movie?.stars} />}
            </div>
            <div className="space-y-2">
              <div>
                <span className="font-bold">Watched at: </span>
                <span className="text-foreground/70">
                  {movie?.watchedAt &&
                    new Date(movie.watchedAt).toLocaleString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                </span>
              </div>
              <div>
                <span className="font-bold">Platform: </span>
                <span className="text-foreground/70">{movie?.platform}</span>
              </div>
              {runtime && (
                <div>
                  <span className="font-bold">Runtime: </span>
                  <span className="text-foreground/70">{runtime}</span>
                </div>
              )}
              <div className="flex flex-row gap-2">
                <div className="inline-flex flex-wrap gap-x-1">
                  <span className="font-bold">Genres: </span>
                  {movie?.metadata.genres.map((genre, index) => (
                    <span key={genre} className="text-foreground/70">
                      {genre}
                      {movie.metadata.genres.length != index + 1 && ","}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
