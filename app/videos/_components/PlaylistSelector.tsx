import { routes } from "@/lib/constants";
import Link from "next/link";
import { PLAYLISTS } from "../../../lib/videos/videos";

type Props = {
  playlistSlug: string;
};

export default function PlaylistSelector({ playlistSlug }: Props) {
  return (
    <ul className="flex flex-wrap justify-center gap-3 place-self-center">
      {PLAYLISTS.map((playlist) => (
        <li key={playlist.slug}>
          <Link href={routes.videos(playlist.slug)}>
            <button
              className={`cursor-pointer border-1 px-5 py-2 text-sm font-semibold max-md:w-full ${
                playlist.slug === playlistSlug
                  ? "text-primary border-primary bg-primary/10"
                  : "text-primary/30 border-primary/30 hover:text-primary/50 hover:border-primary/50 transition-all"
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
