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
import { ShowFilters, showSchema } from "@/lib/shows/types";
import { useFormContext } from "react-hook-form";

type Props = {
  genres: string[];
};

export default function ShowFilterForm({ genres }: Props) {
  const form = useFormContext<ShowFilters>();

  return (
    <form
      className="flex flex-row items-end gap-4"
      onSubmit={form.handleSubmit(() => {})}
    >
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="sr-only">Title</FormLabel>
            <FormControl>
              <Input id="title" placeholder="Search by title" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="recommended"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="sr-only">Recommended</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger id="recommended">
                  <SelectValue placeholder="Recommendation" />
                </SelectTrigger>
                <SelectContent>
                  {showSchema.shape.recommended.options.map((option) => (
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
        name="genre"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="sr-only">Genres</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger id="genres">
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
    </form>
  );
}
