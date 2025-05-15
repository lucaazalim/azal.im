import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Video } from "../_lib/videos";
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
      <DialogContent className="min-w-[80vw] min-h-auto" hideClose={true}>
        <DialogHeader>
          <DialogTitle className="hidden">{video?.snippet.title}</DialogTitle>
        </DialogHeader>
        {video && <YouTubeEmbed videoId={video.snippet.resourceId.videoId} />}
      </DialogContent>
    </Dialog>
  );
}
