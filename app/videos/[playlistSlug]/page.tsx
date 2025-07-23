import PageHeader from "@/app/_components/header/PageHeader";
import PageHeaderDescription from "@/app/_components/header/PageHeaderDescription";
import PageHeaderTag from "@/app/_components/header/PageHeaderTag";
import PageHeaderTitle from "@/app/_components/header/PageHeaderTitle";
import PageWrapper from "@/app/_components/header/PageWrapper";
import { BASE_URL, ROUTES } from "@/lib/constants";
import { Metadata } from "next";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ playlistSlug: string }>;
}): Promise<Metadata> {
  const { playlistSlug } = await params;
  const playlist = PLAYLISTS.find((p) => p.slug === playlistSlug);

  if (!playlist) {
    return {
      title: "Videos",
    };
  }

  return {
    title: `${playlist.title} Videos`,
    description: `A curated list of ${playlist.title.toLowerCase()} YouTube videos I've learned from or enjoyed. I hope you find them useful too.`,
    openGraph: {
      title: `${playlist.title} Videos - Luca Azalim`,
      description: `A curated list of ${playlist.title.toLowerCase()} YouTube videos I've learned from or enjoyed. I hope you find them useful too.`,
      url: BASE_URL + ROUTES.videos(playlistSlug),
      type: "website",
    },
    twitter: {
      title: `${playlist.title} Videos - Luca Azalim`,
      description: `A curated list of ${playlist.title.toLowerCase()} YouTube videos I've learned from or enjoyed. I hope you find them useful too.`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ playlistSlug: string }>;
}) {
  const { playlistSlug } = await params;
  const videos = await getVideos(playlistSlug);

  if (!videos) {
    return redirect(ROUTES.videos());
  }

  return (
    <PageWrapper className="mx-auto max-w-5xl">
      <PageHeader>
        <PageHeaderTag>Videos</PageHeaderTag>
        <PageHeaderTitle>What I've Been Watching</PageHeaderTitle>
        <PageHeaderDescription>
          A curated list of YouTube videos I've learned from or enjoyed. I hope
          you find them useful too.
        </PageHeaderDescription>
      </PageHeader>
      <div className="space-y-10">
        <PlaylistSelector playlistSlug={playlistSlug} />
        <VideoGrid videos={videos} />
      </div>
    </PageWrapper>
  );
}
