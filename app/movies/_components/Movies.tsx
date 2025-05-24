"use client";

import { Form } from "@/components/ui/form";
import {
  MovieFilters,
  movieFilterSchema,
  MovieWithMetadata,
} from "@/lib/movies/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import MovieFilterForm from "./MovieFilterForm";
import MoviesGrid from "./MovieGrid";
import MovieSheet from "./MovieSheet";

type Props = {
  genres: string[];
};

export default function Movies({ genres }: Props) {
  const form = useForm<MovieFilters>({
    resolver: zodResolver(movieFilterSchema),
    defaultValues: {
      title: "",
      stars: undefined,
      genre: undefined,
    },
  });

  const [openMovie, setOpenMovie] = useState<MovieWithMetadata>();

  return (
    <div className="flex flex-col gap-6">
      <MovieSheet movie={openMovie} onClose={() => setOpenMovie(undefined)} />
      <Form {...form}>
        <div className="flex justify-center">
          <MovieFilterForm genres={genres} />
        </div>
        <MoviesGrid onMovieClicked={(movie) => setOpenMovie(movie)} />
      </Form>
    </div>
  );
}
