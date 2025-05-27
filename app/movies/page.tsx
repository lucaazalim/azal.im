import PageDescription from "@/app/_components/PageDescription";
import PageHeader from "@/app/_components/PageHeader";
import PageTitle from "@/app/_components/PageTitle";
import { genres, totalMovies, totalRuntime } from "@/lib/movies/movies";
import Movies from "./_components/Movies";

export default function Page() {
  const totalRuntimeInHoursFormatted = Math.round(
    totalRuntime / 60,
  ).toLocaleString();

  const totalMoviesFormatted = totalMovies.toLocaleString();

  return (
    <div className="mx-auto space-y-5 px-5 py-10">
      <PageHeader>
        <PageTitle>Movies</PageTitle>
        <PageDescription>
          <span className="font-bold">{totalRuntimeInHoursFormatted}</span>{" "}
          hours. <span className="font-bold">{totalMoviesFormatted}</span>{" "}
          titles. All rated.
        </PageDescription>
      </PageHeader>
      <Movies genres={genres} />
    </div>
  );
}
