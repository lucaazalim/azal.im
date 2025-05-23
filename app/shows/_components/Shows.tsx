"use client";

import { Form } from "@/components/ui/form";
import { ShowFilters, showFilterSchema } from "@/lib/shows/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ShowFilterForm from "./ShowFilterForm";
import ShowsGrid from "./ShowGrid";

type Props = {
  genres: string[];
};

export default function Shows({ genres }: Props) {
  const form = useForm<ShowFilters>({
    resolver: zodResolver(showFilterSchema),
    defaultValues: {
      title: "",
      stars: undefined,
      genre: undefined,
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <div className="flex justify-center">
          <ShowFilterForm genres={genres} />
        </div>
        <ShowsGrid />
      </Form>
    </div>
  );
}
