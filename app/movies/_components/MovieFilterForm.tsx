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
import { RefreshCcw } from "lucide-react";
import { useFormContext } from "react-hook-form";
import Stars from "./Stars";

type Props = {
  genres: string[];
};

export default function MovieFilterForm({ genres }: Props) {
  const form = useFormContext<MovieFilters>();
  const EMPTY_KEY = "empty";

  return (
    <form
      className="bg-accent grid w-full grid-cols-2 items-end gap-5 self-center border p-5 lg:max-w-6xl lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_0.5fr]"
      onSubmit={(e) => e.preventDefault()}
    >
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="flex grow flex-col max-lg:col-span-2">
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
              <Select
                key={field.value ?? EMPTY_KEY}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
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
                key={field.value ?? EMPTY_KEY}
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
              <Select
                key={field.value ?? EMPTY_KEY}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
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
                key={field.value ?? EMPTY_KEY}
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
        type="button"
        variant="outline"
        className="max-lg:col-span-2"
        onClick={() => {
          form.reset();
        }}
      >
        <RefreshCcw />
        <span>Reset</span>
      </Button>
    </form>
  );
}
