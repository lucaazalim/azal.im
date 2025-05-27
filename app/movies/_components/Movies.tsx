"use client";

import { Form } from "@/app/_components/ui/form";
import {
  MovieFilters,
  movieFilterSchema,
  MovieWithMetadata,
} from "@/lib/movies/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import MovieDetailsSheet from "./MovieDetailsSheet";
import MovieFilterForm from "./MovieFilterForm";
import MoviesGrid from "./MovieGrid";

type Props = {
  genres: string[];
};

export default function Movies({ genres }: Props) {
  const form = useForm<MovieFilters>({
    resolver: zodResolver(movieFilterSchema),
    defaultValues: {
      title: "",
      type: undefined,
      genre: undefined,
      stars: undefined,
      runtime: undefined,
    },
  });

  const [openMovie, setOpenMovie] = useState<MovieWithMetadata>();

  return (
    <div className="animate-in fade-in flex flex-col gap-6 duration-1000">
      <MovieDetailsSheet
        movie={openMovie}
        onClose={() => setOpenMovie(undefined)}
      />
      <Form {...form}>
        <MovieFilterForm genres={genres} />
        <MoviesGrid onMovieClicked={(movie) => setOpenMovie(movie)} />
      </Form>
    </div>
  );
}
