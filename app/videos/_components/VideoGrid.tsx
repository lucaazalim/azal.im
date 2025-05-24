"use client";

import { useState } from "react";
import { Video } from "../_lib/videos";
import VideoCard from "./VideoCard";
import YoutubeOverlay from "./YoutubeOverlay";

type Props = {
  videos: Video[];
};

export default function VideoGrid({ videos }: Props) {
  const [video, setVideo] = useState<Video | null>(null);

  return (
    <>
      <YoutubeOverlay video={video} onClose={() => setVideo(null)} />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {videos.map((video: Video, index: number) => (
          <VideoCard
            key={video.snippet.resourceId.videoId}
            video={video}
            index={index}
            onClick={() => {
              const isMobile = window.innerWidth <= 768;

              if (isMobile) {
                window.open(
                  `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`,
                  "_blank",
                );
              } else {
                setVideo(video);
              }
            }}
          />
        ))}
      </div>
    </>
  );
}
