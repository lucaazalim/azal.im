import { redirect } from "next/navigation";
import { routes } from "../../lib/constants";
import { PLAYLISTS } from "./_lib/videos";

export default function Page() {
  redirect(routes.videos(PLAYLISTS[0].slug));
}
