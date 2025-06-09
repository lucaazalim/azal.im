import PageHeader from "@/app/_components/header/PageHeader";
import PageHeaderDescription from "@/app/_components/header/PageHeaderDescription";
import PageHeaderTitle from "@/app/_components/header/PageHeaderTitle";
import PostCard from "@/app/blog/_components/PostCard";
import { getPosts } from "@/lib/blog/posts";
import PageHeaderTag from "../_components/header/PageHeaderTag";

export default async function Page() {
  return (
    <div className="mx-auto max-w-[950px] space-y-10 px-5 pb-5">
      <PageHeader>
        <PageHeaderTag>Blog</PageHeaderTag>
        <PageHeaderTitle>Definitely a Blog</PageHeaderTitle>
        <PageHeaderDescription>
          Thoughts on programming, software architecture, and whatever else I
          find interesting.
        </PageHeaderDescription>
      </PageHeader>
      <main className="animate-in slide-in-from-bottom-20 fade-in grid grid-cols-1 gap-5 duration-500 ease-out md:grid-cols-3">
        {(await getPosts()).map((post, index) => (
          <PostCard key={index} post={post} index={index} />
        ))}
      </main>
    </div>
  );
}
