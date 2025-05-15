import * as motion from "@/app/_utils/motion";
import { Play, Youtube } from "lucide-react";
import Image from "next/image";
import { Video } from "../_lib/videos";

type Props = {
  video: Video;
  index: number;
  onClick: () => void;
};

export default function VideoCard({ video, index, onClick }: Props) {
  return (
    <motion.article
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.2 * Math.min(index, 5),
        ease: "easeIn",
      }}
      className="cursor-pointer flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-800 group"
    >
      <div className="relative aspect-video">
        <div className="absolute flex justify-center items-center size-full z-40 opacity-0 md:group-hover:opacity-100 transition-all duration-400">
          <Play className="opacity-0 md:group-hover:opacity-100 size-5 md:group-hover:size-12 duration-400 transition-all text-accent fill-current" />
        </div>
        <Image
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-t-2xl object-cover md:group-hover:brightness-[25%] transition-all"
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
            <Youtube className="size-5" />
            <span className="line-clamp-1">
              {video.snippet.videoOwnerChannelTitle}
            </span>
          </span>
        </div>
      </div>
    </motion.article>
  );
}
