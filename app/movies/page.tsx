import PageHeader from "@/app/_components/header/PageHeader";
import PageHeaderDescription from "@/app/_components/header/PageHeaderDescription";
import PageHeaderTitle from "@/app/_components/header/PageHeaderTitle";
import { genres } from "@/lib/movies/movies";
import PageHeaderTag from "../_components/header/PageHeaderTag";
import PageWrapper from "../_components/header/PageWrapper";
import Movies from "./_components/Movies";
import MovieStats from "./_components/MovieStats";

export default function Page() {
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderTag>Movies</PageHeaderTag>
        <PageHeaderTitle>Grab some popcorn</PageHeaderTitle>
        <PageHeaderDescription>
          Since 2018, I've been keeping track of the movies and series I've
          watched, rating each one from 1 to 5 stars.
        </PageHeaderDescription>
      </PageHeader>
      <MovieStats />
      <Movies genres={genres} />
    </PageWrapper>
  );
}
