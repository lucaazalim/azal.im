import { Post } from "@/app/blog/_lib/posts";
import * as motion from "@/lib/motion";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

type Props = {
  post: Post;
  index: number;
};

export default function PostCard({ post, index }: Props) {
  return (
    <Link href={post.route}>
      <motion.article
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-800"
      >
        <div className="relative h-[200px] w-full shrink-0">
          <Image
            src={post.metadata.cover}
            alt={post.metadata.title}
            fill={true}
            sizes="30vw"
            className="rounded-t-2xl object-cover"
          />
        </div>
        <div className="flex grow flex-col justify-between gap-3 p-5">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">{post.metadata.title}</h3>
            <p className="line-clamp-3 text-neutral-500">
              {post.metadata.description}
            </p>
          </div>
          <div>
            <p className="text-sm">
              {format(post.metadata.date, "LLLL d, yyyy")}
            </p>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
