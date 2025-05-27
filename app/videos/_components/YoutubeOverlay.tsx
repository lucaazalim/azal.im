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
      <DialogContent className="max-[2100px]:min-w-[80vw] min-[2101px]:min-w-[50vw]">
        <DialogHeader>
          <DialogTitle className="hidden">{video?.snippet.title}</DialogTitle>
        </DialogHeader>
        {video && <YouTubeEmbed videoId={video.snippet.resourceId.videoId} />}
      </DialogContent>
    </Dialog>
  );
}
