import { ROUTES } from "@/lib/constants";
import Link from "next/link";
import { PLAYLISTS } from "../_lib/videos";

type Props = {
  playlistSlug: string;
};

export default function PlaylistSelector({ playlistSlug }: Props) {
  return (
    <ul className="grid grid-cols-2 md:flex md:flex-wrap gap-3">
      {PLAYLISTS.map((playlist) => (
        <li key={playlist.slug}>
          <Link href={ROUTES.VIDEOS(playlist.slug)}>
            <button
              className={`max-md:w-full text-sm font-semibold border-2 py-2 px-3 rounded-full ${
                playlist.slug === playlistSlug
                  ? "text-accent border-accent bg-accent/10"
                  : "text-accent/30 border-accent/30 hover:text-accent/50 hover:border-accent/50 transition-all"
              }`}
            >
              {playlist.title}
            </button>
          </Link>
        </li>
      ))}
    </ul>
  );
}
