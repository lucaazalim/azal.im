import PostCard from "@/app/blog/_components/PostCard";
import { getPosts } from "@/app/blog/_lib/posts";
import * as motion from "@/lib/motion";
import HomeButton from "../(home)/_components/HomeButton";

export default async function Page() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="mx-auto max-w-[950px] space-y-10 px-5 py-10"
    >
      <header className="space-y-10">
        <HomeButton />
        <div className="space-y-3">
          <h1 className="font-serif text-4xl font-bold">Luca Azalim's Blog</h1>
          <h2 className="font-serif text-xl">
            I write about programming, technology, and life.
          </h2>
        </div>
      </header>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {(await getPosts()).map((post, index) => (
          <PostCard key={index} post={post} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
