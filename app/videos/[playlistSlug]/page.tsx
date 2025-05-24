import { ROUTES } from "@/lib/constants";
import { redirect } from "next/navigation";
import HomeButton from "../../(home)/_components/HomeButton";
import PlaylistSelector from "../_components/PlaylistSelector";
import VideoGrid from "../_components/VideoGrid";
import { getVideos, PLAYLISTS } from "../_lib/videos";

export const dynamicParams = false;
export const revalidate = 60;

export async function generateStaticParams() {
  return PLAYLISTS.map((playlist) => ({
    playlistSlug: playlist.slug,
  }));
}

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
    <div className="mx-auto max-w-[950px] space-y-10 px-5 py-10">
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
      <VideoGrid videos={videos} />
    </div>
  );
}
