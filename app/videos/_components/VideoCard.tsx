import * as motion from "@/app/_utils/motion";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Video } from "../_lib/videos";

type Props = {
  video: Video;
};

export default function VideoCard({ video }: Props) {
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
        <div className="relative aspect-video">
          <Image
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            fill={true}
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
            <span className="text-accent text-sm flex gap-1.5 items-center">
              <PlayCircle className="size-4" />
              <span className="line-clamp-1">
                {video.snippet.videoOwnerChannelTitle}
              </span>
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
