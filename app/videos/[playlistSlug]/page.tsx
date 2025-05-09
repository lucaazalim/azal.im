import { Suspense } from "react";
import HomeButton from "../../_components/HomeButton";
import PlaylistSelector from "../_components/PlaylistSelector";
import VideoGrid from "../_components/VideoGrid";
import { PLAYLISTS } from "../_lib/videos";

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
      <Suspense>
        <VideoGrid playlistSlug={playlistSlug} />
      </Suspense>
    </div>
  );
}
