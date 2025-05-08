import { redirect } from "next/navigation";
import { ROUTES } from "../_utils/constants";
import { PLAYLISTS } from "./_lib/videos";

export default function Page() {
  redirect(ROUTES.VIDEOS(PLAYLISTS[0].slug));
}
