import { ROUTES } from "@/app/_utils/constants";
import * as motion from "@/app/_utils/motion";
import { redirect } from "next/navigation";
import VideoCard from "../_components/VideoCard";
import { getVideos, Video } from "../_lib/videos";

type Props = {
  playlistSlug: string;
};

export default async function VideoGrid({ playlistSlug }: Props) {
  const videos = await getVideos(playlistSlug);

  if (!videos) {
    return redirect(ROUTES.VIDEOS());
  }

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {videos.map((video: Video, index: number) => (
          <VideoCard
            key={video.snippet.resourceId.videoId}
            video={video}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
}
