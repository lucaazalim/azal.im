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

export type Video = {
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
      high: {
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

export async function getVideos(slug: string): Promise<Video[] | undefined> {
  const playlist = PLAYLISTS.find((playlist) => playlist.slug === slug);

  if (!playlist) {
    return undefined;
  }

  const result = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlist.id}&maxResults=50&key=${process.env.GOOGLE_CLOUD_API_KEY}`,
  );

  if (!result.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: { items: Video[] } = await result.json();

  data.items = data.items.sort((a, b) => {
    return (
      new Date(b.snippet.publishedAt).getTime() -
      new Date(a.snippet.publishedAt).getTime()
    );
  });

  return data.items;
}
