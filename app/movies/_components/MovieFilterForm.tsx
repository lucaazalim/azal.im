import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MovieFilters } from "@/lib/movies/types";
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
      className="bg-accent grid grid-cols-1 items-end gap-4 rounded-xl p-5 md:flex md:flex-row"
      onSubmit={form.handleSubmit(() => {})}
    >
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input
                id="title"
                placeholder="Search by title"
                className="w-full md:w-50"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="stars"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Stars</FormLabel>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <SelectTrigger className="w-full md:w-50">
                  <SelectValue placeholder="Stars" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 5 })
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

      <FormField
        control={form.control}
        name="genre"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Genre</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full md:w-50">
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

      <Button
        variant="outline"
        onClick={() => {
          form.setValue("title", "");
          // @ts-ignore
          form.setValue("stars", "");
          form.setValue("genre", "");
        }}
      >
        <BrushCleaning />
      </Button>
    </form>
  );
}
