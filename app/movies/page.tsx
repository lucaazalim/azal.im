import * as motion from "@/lib/motion";
import { getGenres } from "@/lib/movies/movies";
import HomeButton from "../(home)/_components/HomeButton";
import Movies from "./_components/Movies";

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="mx-auto space-y-5 px-5 py-10"
    >
      <header className="mx-auto flex max-w-[950px] flex-col items-center space-y-5 text-center">
        <HomeButton />
        <div className="space-y-3">
          <h1 className="font-serif text-4xl font-bold">Movies</h1>
          <h2 className="font-serif text-xl">I love watching movies!</h2>
        </div>
      </header>

      <Movies genres={getGenres()} />
    </motion.div>
  );
}
