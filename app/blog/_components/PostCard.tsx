import LoadingImage from "@/app/_components/LoadingImage";
import { Post } from "@/lib/blog/posts";
import { format } from "date-fns";
import Link from "next/link";

type Props = {
  post: Post;
  className?: string;
};

export default function PostCard({ post, className }: Props) {
  return (
    <Link href={post.route} className={className}>
      <article className="group flex h-full flex-col overflow-hidden border border-neutral-800">
        <div className="relative aspect-video w-full shrink-0">
          <LoadingImage
            src={post.metadata.cover}
            alt={post.metadata.title}
            fill={true}
            sizes="30vw"
            className="object-cover"
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
            <p className="font-mono text-sm uppercase">
              {format(post.metadata.date, "LLLL d, yyyy")}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}
