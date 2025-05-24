import PostCard from "@/app/blog/_components/PostCard";
import { getPosts } from "@/app/blog/_lib/posts";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";

export default async function Page() {
  return (
    <div className="mx-auto max-w-[950px] space-y-10 px-5 py-10">
      <PageHeader>
        <PageTitle>Luca Azalim's Blog</PageTitle>
        <PageDescription>
          I write about programming, technology, and life.
        </PageDescription>
      </PageHeader>
      <div className="animate-in fade-in grid grid-cols-1 gap-5 duration-500 ease-in md:grid-cols-3">
        {(await getPosts()).map((post, index) => (
          <PostCard key={index} post={post} index={index} />
        ))}
      </div>
    </div>
  );
}
