export const PLAYLISTS: Playlist[] = [
  {
    slug: "software-development",
    title: "Software Development",
    id: "PLPg-XDqJPa5SOJEeMV0jrQH7xmy1ZZgi2",
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

  console.log(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlist.id}&maxResults=50&key=${process.env.GOOGLE_CLOUD_API_KEY}`
  );

  const result = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlist.id}&maxResults=50&key=${process.env.GOOGLE_CLOUD_API_KEY}`
  );

  if (!result.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: { items: Video[] } = await result.json();

  return data.items;
}
