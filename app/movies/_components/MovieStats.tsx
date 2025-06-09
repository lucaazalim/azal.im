import CountUp from "@/app/_components/CountUp";
import { totalMovies, totalRuntime } from "@/lib/movies/movies";

export default function MovieStats() {
  return (
    <div className="border-px grid grid-cols-2 gap-10 place-self-center border-x px-5">
      <span className="flex flex-col items-center">
        <CountUp
          className="text-xl font-semibold"
          from={0}
          to={totalRuntime / 60}
          separator=","
          duration={1}
        />
        <span className="font-mono uppercase opacity-50">hours</span>
      </span>
      <span className="flex flex-col items-center">
        <CountUp
          className="text-xl font-semibold"
          from={0}
          to={totalMovies}
          separator=","
          duration={1}
        />
        <span className="font-mono uppercase opacity-50">titles</span>
      </span>
    </div>
  );
}
