import { redirect } from "next/navigation";
import { ROUTES } from "../../lib/constants";
import { PLAYLISTS } from "../../lib/videos/videos";

export default function Page() {
  redirect(ROUTES.videos(PLAYLISTS[0].slug));
}
