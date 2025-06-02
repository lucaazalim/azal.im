import PageHeader from "@/app/_components/header/PageHeader";
import PageHeaderDescription from "@/app/_components/header/PageHeaderDescription";
import PageHeaderTitle from "@/app/_components/header/PageHeaderTitle";
import { genres, totalMovies, totalRuntime } from "@/lib/movies/movies";
import Movies from "./_components/Movies";

export default function Page() {
  const totalRuntimeInHoursFormatted = Math.round(
    totalRuntime / 60,
  ).toLocaleString();

  const totalMoviesFormatted = totalMovies.toLocaleString();

  return (
    <div className="mx-auto space-y-5 p-5">
      <PageHeader>
        <PageHeaderTitle>Movies</PageHeaderTitle>
        <PageHeaderDescription>
          <span className="font-bold">{totalRuntimeInHoursFormatted}</span>{" "}
          hours. <span className="font-bold">{totalMoviesFormatted}</span>{" "}
          titles. All rated.
        </PageHeaderDescription>
      </PageHeader>
      <Movies genres={genres} />
    </div>
  );
}
