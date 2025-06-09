import LoadingImage from "@/app/_components/LoadingImage";
import { cn } from "@/lib/utils";
import { Play, Youtube } from "lucide-react";
import { Video } from "../../../lib/videos/videos";

type Props = {
  video: Video;
  index: number;
  onClick: () => void;
};

export default function VideoCard({ video, index, onClick }: Props) {
  return (
    <article
      onClick={onClick}
      className={cn(
        "animate-in fade-in group flex h-full cursor-pointer flex-col overflow-hidden border border-neutral-800",
        index === 0 && "duration-200",
        index === 1 && "duration-400",
        index === 2 && "duration-600",
        index === 3 && "duration-800",
        index >= 4 && "duration-1000",
      )}
    >
      <div className="relative aspect-video">
        <div className="absolute z-40 flex size-full items-center justify-center opacity-0 transition-all duration-400 md:group-hover:opacity-100">
          <Play className="text-primary size-5 fill-current opacity-0 transition-all duration-400 md:group-hover:size-12 md:group-hover:opacity-100" />
        </div>
        <LoadingImage
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
          fill={true}
          className="object-cover transition-all md:group-hover:brightness-25"
          unoptimized
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
    </article>
  );
}
