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
import { Slider } from "@/app/_components/ui/slider";
import { MAX_MOVIE_STARS, MovieFilters, TYPES } from "@/lib/movies/types";
import { RefreshCcw } from "lucide-react";
import { useFormContext } from "react-hook-form";
import Stars from "./Stars";

type Props = {
  genres: string[];
};

export default function MovieFilterForm({ genres }: Props) {
  const form = useFormContext<MovieFilters>();
  const EMPTY_OPTION_VALUE = "__empty__";
  const RUNTIME_MIN = 0;
  const RUNTIME_MAX = 240;
  const RUNTIME_STEP = 30;

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${minutes}m`;
    }

    if (remainingMinutes === 0) {
      return `${hours}h`;
    }

    return `${hours}h${remainingMinutes}`;
  };

  return (
    <form
      className="bg-accent grid w-full grid-cols-2 items-end gap-5 self-center border p-5 lg:max-w-6xl lg:grid-cols-[1fr_1fr_1.25fr_1fr_1fr_0.5fr]"
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
                value={field.value ?? EMPTY_OPTION_VALUE}
                onValueChange={(value) =>
                  field.onChange(
                    value === EMPTY_OPTION_VALUE ? undefined : value,
                  )
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={EMPTY_OPTION_VALUE}>Any</SelectItem>
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
        render={({ field }) => {
          const currentMinRuntime = field.value?.min;
          const currentMaxRuntime = field.value?.max;

          return (
            <FormItem className="flex grow self-stretch flex-col justify-between">
              <FormLabel>Runtime range</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <Slider
                    value={[
                      currentMinRuntime ?? RUNTIME_MIN,
                      currentMaxRuntime ?? RUNTIME_MAX,
                    ]}
                    min={RUNTIME_MIN}
                    max={RUNTIME_MAX}
                    step={RUNTIME_STEP}
                    minStepsBetweenThumbs={1}
                    onValueChange={([nextMinRuntime, nextMaxRuntime]) => {
                      field.onChange({
                        min: nextMinRuntime,
                        max:
                          nextMaxRuntime === RUNTIME_MAX
                            ? undefined
                            : nextMaxRuntime,
                      });
                    }}
                  />
                  <div className="text-muted-foreground flex items-center justify-between text-xs">
                    <span>
                      Min:{" "}
                      {formatRuntime(currentMinRuntime ?? RUNTIME_MIN)}
                    </span>
                    <span>
                      Max:{" "}
                      {currentMaxRuntime
                        ? formatRuntime(currentMaxRuntime)
                        : "Any"}
                    </span>
                  </div>
                </div>
              </FormControl>
            </FormItem>
          );
        }}
      />

      <FormField
        control={form.control}
        name="genre"
        render={({ field }) => (
          <FormItem className="flex grow flex-col">
            <FormLabel>Genre</FormLabel>
            <FormControl>
              <Select
                value={field.value ?? EMPTY_OPTION_VALUE}
                onValueChange={(value) =>
                  field.onChange(
                    value === EMPTY_OPTION_VALUE ? undefined : value,
                  )
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={EMPTY_OPTION_VALUE}>Any</SelectItem>
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
                value={
                  field.value ? field.value.toString() : EMPTY_OPTION_VALUE
                }
                onValueChange={(value) =>
                  field.onChange(
                    value === EMPTY_OPTION_VALUE ? undefined : value,
                  )
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Stars" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={EMPTY_OPTION_VALUE}>Any</SelectItem>
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
