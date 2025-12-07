import { GOOGLE_CLOUD_API_KEY } from "@/lib/constants";

export const PLAYLISTS: Playlist[] = [
  {
    slug: "development",
    title: "Development",
    id: "PLPg-XDqJPa5Rq3XOttALgB6Bj8rkTCHF6",
  },
  {
    slug: "design",
    title: "Design",
    id: "PLPg-XDqJPa5TeqpULqg6lLLaRFffLiXQA",
  },
  {
    slug: "ted",
    title: "TED Talks",
    id: "PLPg-XDqJPa5S1xJpGUpDQVLLVVEUb5UOx",
  },
  {
    slug: "diy",
    title: "DIY",
    id: "PLPg-XDqJPa5SiEEOwj2c5e6-Y3X_29GAo",
  },
  {
    slug: "miscellaneous",
    title: "Miscellaneous",
    id: "PLPg-XDqJPa5S9hdWR54A72QalSRb-hgQ7",
  },
];

export type Playlist = {
  slug: string;
  title: string;
  id: string;
};

type YouTubeResponse = {
  nextPageToken?: string;
  items: Video[];
};

export type Video = {
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default?: {
        url: string;
      };
      medium?: {
        url: string;
      };
      high?: {
        url: string;
      };
      standard?: {
        url: string;
      };
      maxres?: {
        url: string;
      };
    };
    resourceId: {
      videoId: string;
    };
    publishedAt: string;
    videoOwnerChannelTitle: string;
  };
};

export function getThumbnailUrl(video: Video): string {
  const thumbnails = video.snippet.thumbnails;
  return (
    thumbnails.medium?.url ||
    thumbnails.high?.url ||
    thumbnails.standard?.url ||
    thumbnails.maxres?.url ||
    thumbnails.default?.url ||
    ''
  );
}

export async function getVideos(
  slug: string,
  nextPageToken?: string,
): Promise<Video[] | undefined> {
  const playlist = PLAYLISTS.find((playlist) => playlist.slug === slug);

  if (!playlist) {
    return undefined;
  }

  const url = new URL(`https://www.googleapis.com/youtube/v3/playlistItems`);

  url.searchParams.append("part", "snippet");
  url.searchParams.append("playlistId", playlist.id);
  url.searchParams.append("maxResults", "50");

  if (nextPageToken) {
    url.searchParams.append("pageToken", nextPageToken);
  }

  if (!GOOGLE_CLOUD_API_KEY) {
    throw new Error("GOOGLE_CLOUD_API_KEY is not defined");
  }

  url.searchParams.append("key", GOOGLE_CLOUD_API_KEY);

  const result = await fetch(url.toString());

  if (!result.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: YouTubeResponse = await result.json();
  const videos = data.items;

  // Recursively fetch next pages if available
  // This is to ensure we get all videos in the playlist
  if (data.nextPageToken) {
    const nextVideos = await getVideos(slug, data.nextPageToken);
    if (nextVideos) {
      videos.push(...nextVideos);
    }
  }

  videos.sort((a, b) => {
    return (
      new Date(b.snippet.publishedAt).getTime() -
      new Date(a.snippet.publishedAt).getTime()
    );
  });

  return videos;
}
