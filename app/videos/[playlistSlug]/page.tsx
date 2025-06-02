import PageHeader from "@/app/_components/header/PageHeader";
import PageHeaderDescription from "@/app/_components/header/PageHeaderDescription";
import PageHeaderTitle from "@/app/_components/header/PageHeaderTitle";
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
    <div className="mx-auto max-w-[950px] space-y-5 p-5">
      <PageHeader animation={false}>
        <PageHeaderTitle>Videos</PageHeaderTitle>
        <PageHeaderDescription>
          YouTube videos I watched, learned from, or enjoyed.
        </PageHeaderDescription>
      </PageHeader>
      <main className="space-y-10">
        <PlaylistSelector playlistSlug={playlistSlug} />
        <VideoGrid videos={videos} />
      </main>
    </div>
  );
}
