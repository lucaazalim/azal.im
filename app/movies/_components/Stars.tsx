import * as motion from "@/lib/motion";
import { MAX_MOVIE_STARS } from "@/lib/movies/types";
import { Star } from "lucide-react";

type Props = {
  stars: number;
  animationDelay?: number;
};

export default function Stars({ stars, animationDelay = 0.5 }: Props) {
  return (
    <div className="flex flex-row items-center gap-1">
      {Array.from({ length: MAX_MOVIE_STARS }, (_, index) => (
        <motion.div
          key={index}
          initial={{ color: "var(--color-neutral-700)" }}
          transition={{ duration: 0.3, delay: index * 0.1 + animationDelay }}
          animate={{
            color:
              index < stars
                ? "var(--color-yellow-500)"
                : "var(--color-neutral-700)",
          }}
        >
          <Star className="size-5 fill-current" />
        </motion.div>
      ))}
    </div>
  );
}
