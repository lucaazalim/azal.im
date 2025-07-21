import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Video } from "../../../lib/videos/videos";
import YouTubeEmbed from "./YoutubeEmbed";

type YoutubeOverlayProps = {
  video: Video | null;
  onClose: () => void;
};

export default function YoutubeOverlay({
  video,
  onClose,
}: YoutubeOverlayProps) {
  return (
    <Dialog open={!!video} onOpenChange={onClose}>
      <DialogContent className="lg:max-w-[80vw] 2xl:max-w-[60vw]">
        <DialogHeader>
          <DialogTitle className="hidden">{video?.snippet.title}</DialogTitle>
        </DialogHeader>
        {video && <YouTubeEmbed videoId={video.snippet.resourceId.videoId} />}
      </DialogContent>
    </Dialog>
  );
}
