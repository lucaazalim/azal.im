import { ROUTES } from "@/app/_utils/constants";
import * as motion from "@/app/_utils/motion";
import Link from "next/link";
import { redirect } from "next/navigation";
import HomeButton from "../../_components/HomeButton";
import VideoCard from "../_components/VideoCard";
import { getVideos, PLAYLISTS, Video } from "../_lib/videos";

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
        <div>
          <h1 className="font-serif text-4xl font-bold">Videos</h1>
          <h2 className="font-serif text-xl">
            YouTube videos I watched, learned from, or enjoyed.
          </h2>
        </div>
      </header>
      <ul className="flex flex-wrap gap-5">
        {PLAYLISTS.map((playlist) => (
          <li key={playlist.slug}>
            <Link
              href={ROUTES.VIDEOS(playlist.slug)}
              className={`text-sm font-semibold border-2 py-2 px-3 rounded-full ${
                playlist.slug === playlistSlug
                  ? "text-accent border-accent bg-accent/10"
                  : "text-accent/20 border-accent/20 hover:text-accent/50 hover:border-accent/50 transition-all"
              }`}
            >
              {playlist.title}
            </Link>
          </li>
        ))}
      </ul>
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
