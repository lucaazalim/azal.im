import PageHeader from "@/app/_components/header/PageHeader";
import PageHeaderDescription from "@/app/_components/header/PageHeaderDescription";
import PageHeaderTitle from "@/app/_components/header/PageHeaderTitle";
import PostCard from "@/app/blog/_components/PostCard";
import { getPosts } from "@/lib/blog/posts";
import PageHeaderTag from "../_components/header/PageHeaderTag";
import PageWrapper from "../_components/header/PageWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on programming, software architecture, and whatever else I find interesting. Explore my technical articles and insights.",
  openGraph: {
    title: "Blog - Luca Azalim",
    description: "Thoughts on programming, software architecture, and whatever else I find interesting. Explore my technical articles and insights.",
    url: "https://azal.im/blog",
    type: "website",
  },
  twitter: {
    title: "Blog - Luca Azalim",
    description: "Thoughts on programming, software architecture, and whatever else I find interesting. Explore my technical articles and insights.",
  },
};

export default async function Page() {
  return (
    <PageWrapper className="mx-auto max-w-5xl">
      <PageHeader>
        <PageHeaderTag>Blog</PageHeaderTag>
        <PageHeaderTitle>Definitely a Blog</PageHeaderTitle>
        <PageHeaderDescription>
          Thoughts on programming, software architecture, and whatever else I
          find interesting.
        </PageHeaderDescription>
      </PageHeader>
      <div className="animate-in fade-in grid grid-cols-1 gap-5 duration-750 ease-in-out md:grid-cols-3">
        {(await getPosts()).map((post, _) => (
          <PostCard key={post.slug} post={post} className="sm:basis-1/3" />
        ))}
      </div>
    </PageWrapper>
  );
}
