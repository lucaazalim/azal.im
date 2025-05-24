import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import { ROUTES } from "@/lib/constants";
import { redirect } from "next/navigation";
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
      <PageHeader>
        <PageTitle>Videos</PageTitle>
        <PageDescription>
          YouTube videos I watched, learned from, or enjoyed.
        </PageDescription>
      </PageHeader>
      <PlaylistSelector playlistSlug={playlistSlug} />
      <VideoGrid videos={videos} />
    </div>
  );
}
