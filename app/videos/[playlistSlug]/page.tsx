import PageDescription from "@/app/_components/PageDescription";
import PageHeader from "@/app/_components/PageHeader";
import PageTitle from "@/app/_components/PageTitle";
import { routes } from "@/lib/constants";
import { redirect } from "next/navigation";
import { getVideos, PLAYLISTS } from "../../../lib/videos/videos";
import PlaylistSelector from "../_components/PlaylistSelector";
import VideoGrid from "../_components/VideoGrid";

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
    return redirect(routes.videos());
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
