import * as motion from "@/lib/motion";
import HomeButton from "../(home)/_components/HomeButton";
import ShowsGrid from "./_components/ShowGrid";

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="mx-auto px-5 py-10 space-y-10"
    >
      <header className="space-y-10 max-w-[950px] mx-auto">
        <HomeButton />
        <div className="space-y-3">
          <h1 className="font-serif text-4xl font-bold">Shows</h1>
          <h2 className="font-serif text-xl">Shows I have watched.</h2>
        </div>
      </header>

      <ShowsGrid />
    </motion.div>
  );
}
