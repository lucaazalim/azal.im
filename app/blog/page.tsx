import PageHeader from "@/app/_components/header/PageHeader";
import PageHeaderDescription from "@/app/_components/header/PageHeaderDescription";
import PageHeaderTitle from "@/app/_components/header/PageHeaderTitle";
import PostCard from "@/app/blog/_components/PostCard";
import { getPosts } from "@/lib/blog/posts";
import PageHeaderTag from "../_components/header/PageHeaderTag";
import PageWrapper from "../_components/header/PageWrapper";

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
        {(await getPosts()).map((post, index) => (
          <PostCard key={index} post={post} index={index} />
        ))}
      </div>
    </PageWrapper>
  );
}
