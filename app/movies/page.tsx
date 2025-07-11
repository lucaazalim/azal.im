import PageHeader from "@/app/_components/header/PageHeader";
import PageHeaderDescription from "@/app/_components/header/PageHeaderDescription";
import PageHeaderTitle from "@/app/_components/header/PageHeaderTitle";
import { genres } from "@/lib/movies/movies";
import PageHeaderTag from "../_components/header/PageHeaderTag";
import PageWrapper from "../_components/header/PageWrapper";
import Movies from "./_components/Movies";
import MovieStats from "./_components/MovieStats";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movies",
  description: "Since 2018, I've been keeping track of the movies and series I've watched, rating each one from 1 to 5 stars. Discover my movie recommendations.",
  openGraph: {
    title: "Movies - Luca Azalim",
    description: "Since 2018, I've been keeping track of the movies and series I've watched, rating each one from 1 to 5 stars. Discover my movie recommendations.",
    url: "https://azal.im/movies",
    type: "website",
  },
  twitter: {
    title: "Movies - Luca Azalim",
    description: "Since 2018, I've been keeping track of the movies and series I've watched, rating each one from 1 to 5 stars. Discover my movie recommendations.",
  },
};

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
      <div className="space-y-5">
        <MovieStats />
        <Movies genres={genres} />
      </div>
    </PageWrapper>
  );
}
