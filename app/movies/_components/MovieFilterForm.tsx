import { Button } from "@/app/_components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { MAX_MOVIE_STARS, MovieFilters, TYPES } from "@/lib/movies/types";
import { BrushCleaning } from "lucide-react";
import { useFormContext } from "react-hook-form";
import Stars from "./Stars";

type Props = {
  genres: string[];
};

export default function MovieFilterForm({ genres }: Props) {
  const form = useFormContext<MovieFilters>();

  return (
    <form
      className="bg-accent grid grid-cols-2 items-end gap-4 rounded-xl border p-5 md:flex md:flex-row"
      onSubmit={form.handleSubmit(() => {})}
    >
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="col-span-2 flex grow flex-col">
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input id="title" placeholder="Search by title" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem className="flex grow flex-col">
            <FormLabel>Type</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {TYPES.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="runtime"
        render={({ field }) => (
          <FormItem className="flex grow flex-col">
            <FormLabel>Max runtime</FormLabel>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value ? String(field.value) : undefined}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Max runtime" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    {
                      label: "30m",
                      value: "30",
                    },
                    {
                      label: "1h",
                      value: "60",
                    },
                    {
                      label: "1h30",
                      value: "90",
                    },
                    {
                      label: "2h",
                      value: "120",
                    },
                    {
                      label: "2h30",
                      value: "150",
                    },
                    {
                      label: "3h",
                      value: "180",
                    },
                    {
                      label: "4h",
                      value: "240",
                    },
                  ].map(({ label, value }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="genre"
        render={({ field }) => (
          <FormItem className="flex grow flex-col">
            <FormLabel>Genre</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="stars"
        render={({ field }) => (
          <FormItem className="flex grow flex-col">
            <FormLabel>Stars</FormLabel>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Stars" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: MAX_MOVIE_STARS })
                    .map((_, index) => index + 1)
                    .map((option) => (
                      <SelectItem key={option} value={option.toString()}>
                        <Stars stars={option} animationDelay={0} />
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />

      <Button
        variant="outline"
        className="col-span-2"
        onClick={() => {
          form.setValue("title", "");
          form.setValue("stars", undefined);
          form.setValue("genre", "");
        }}
      >
        <BrushCleaning />
        <span>Clean</span>
      </Button>
    </form>
  );
}
