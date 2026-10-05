import { cn } from "@/lib/utils";
import avatar from "@/public/avatar.png";
import Image from "next/image";

const corners = [
  "-top-px -left-px border-t border-l",
  "-top-px -right-px border-t border-r",
  "-bottom-px -left-px border-b border-l",
  "-bottom-px -right-px border-b border-r",
];

/**
 * Head-and-shoulders photo in a thin frame with orange corner marks. The
 * photo's black backdrop blends into the dark page, and the bottom fades out
 * so the crop doesn't end on a hard edge.
 *
 * The photo is imported rather than referenced as `/avatar.png` so its URL
 * carries a content hash: the image optimizer caches by URL for a month
 * (`minimumCacheTTL`), and a new photo must not be served the old one's cache.
 */
export default function Portrait({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-4/5", className)}>
      <Image
        src={avatar}
        alt="Portrait of Luca Azalim"
        fill
        sizes="(min-width: 1024px) 240px, 176px"
        loading="eager"
        fetchPriority="high"
        placeholder="blur"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="from-background absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t to-transparent"
      />
      <div
        aria-hidden="true"
        className="border-foreground/10 absolute inset-0 border"
      />
      {corners.map((position) => (
        <span
          key={position}
          aria-hidden="true"
          className={cn("border-primary absolute size-3", position)}
        />
      ))}
    </div>
  );
}
