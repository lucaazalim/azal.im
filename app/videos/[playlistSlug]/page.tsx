import { ROUTES } from "@/app/_utils/constants";
import * as motion from "@/app/_utils/motion";
import { redirect } from "next/navigation";
import HomeButton from "../../_components/HomeButton";
import PlaylistSelector from "../_components/PlaylistSelector";
import VideoCard from "../_components/VideoCard";
import { getVideos, Video } from "../_lib/videos";

export default async function Page({
  params,
}: {
  params: Promise<{ playlistSlug: string }>;
}) {
  const { playlistSlug } = await params;
  const videos = await getVideos(playlistSlug);

  if (!videos) {
    return redirect(ROUTES.VIDEOS());
  }

  return (
    <div className="mx-auto px-5 py-10 max-w-[950px] space-y-10">
      <header className="space-y-10">
        <HomeButton />
        <div className="space-y-3">
          <h1 className="font-serif text-4xl font-bold">Videos</h1>
          <h2 className="font-serif text-xl">
            YouTube videos I watched, learned from, or enjoyed.
          </h2>
        </div>
      </header>
      <PlaylistSelector playlistSlug={playlistSlug} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {videos.map((video: Video, index: number) => (
            <VideoCard key={index} video={video} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
