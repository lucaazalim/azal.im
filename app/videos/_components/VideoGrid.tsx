"use client";

import * as motion from "@/app/_utils/motion";
import { useState } from "react";
import VideoCard from "../_components/VideoCard";
import { Video } from "../_lib/videos";
import YoutubeOverlay from "./YoutubeOverlay";

type Props = {
  videos: Video[];
};

export default function VideoGrid({ videos }: Props) {
  const [video, setVideo] = useState<Video | null>(null);

  return (
    <>
      <YoutubeOverlay video={video} onClose={() => setVideo(null)} />
      <motion.div
        initial={{ y: 50, type: "spring" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {videos.map((video: Video, index: number) => (
            <VideoCard
              key={video.snippet.resourceId.videoId}
              video={video}
              index={index}
              onClick={() => setVideo(video)}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
}
