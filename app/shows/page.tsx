import * as motion from "@/lib/motion";
import { getGenres } from "@/lib/shows/shows";
import HomeButton from "../(home)/_components/HomeButton";
import Shows from "./_components/Shows";

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="mx-auto px-5 py-10 space-y-5"
    >
      <header className="space-y-5 max-w-[950px] mx-auto flex flex-col text-center items-center">
        <HomeButton />
        <div className="space-y-3">
          <h1 className="font-serif text-4xl font-bold">Shows</h1>
          <h2 className="font-serif text-xl">Shows I have watched.</h2>
        </div>
      </header>

      <Shows genres={getGenres()} />
    </motion.div>
  );
}
