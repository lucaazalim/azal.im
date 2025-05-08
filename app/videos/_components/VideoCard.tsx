import * as motion from "@/app/_utils/motion";
import Image from "next/image";
import Link from "next/link";
import { Video } from "../_lib/videos";

type Props = {
  video: Video;
  index: number;
};

export default function VideoCard({ video, index }: Props) {
  return (
    <Link
      href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
      target="_blank"
    >
      <motion.article
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-800 group"
      >
        <div className="relative w-full shrink-0 h-[200px]">
          <Image
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            fill={true}
            sizes="30vw"
            className="rounded-t-2xl object-cover"
          />
        </div>
        <div className="flex flex-grow flex-col justify-between gap-3 p-5">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">{video.snippet.title}</h3>
            <p className="text-neutral-500 line-clamp-3">
              {video.snippet.description}
            </p>
          </div>
          <div>
            <span className="text-sm">
              {video.snippet.videoOwnerChannelTitle}
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
