import * as motion from "@/lib/motion";
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
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-neutral-800"
    >
      <div className="relative aspect-video">
        <div className="absolute z-40 flex size-full items-center justify-center opacity-0 transition-all duration-400 md:group-hover:opacity-100">
          <Play className="text-primary size-5 fill-current opacity-0 transition-all duration-400 md:group-hover:size-12 md:group-hover:opacity-100" />
        </div>
        <Image
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-t-2xl object-cover transition-all md:group-hover:brightness-25"
        />
      </div>
      <div className="flex grow flex-col justify-between gap-3 p-5">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">{video.snippet.title}</h3>
          <p className="line-clamp-3 text-neutral-500">
            {video.snippet.description}
          </p>
        </div>
        <div>
          <span className="text-primary flex items-center gap-1.5 text-sm">
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
