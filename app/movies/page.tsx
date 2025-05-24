import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import { getGenres, totalMovies } from "@/lib/movies/movies";
import Movies from "./_components/Movies";

export default function Page() {
  return (
    <div className="mx-auto space-y-5 px-5 py-10">
      <PageHeader>
        <PageTitle>Movies</PageTitle>
        <PageDescription>
          I've watched <span className="font-bold">{totalMovies}</span> movies
          and series in the last few years. Here are all of them with my rates.
        </PageDescription>
      </PageHeader>
      <Movies genres={getGenres()} />
    </div>
  );
}
