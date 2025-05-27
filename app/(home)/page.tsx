import About from "@/app/(home)/_components/sections/About";
import Awards from "@/app/(home)/_components/sections/Awards";
import Education from "@/app/(home)/_components/sections/Education";
import Experiences from "@/app/(home)/_components/sections/Experiences";
import Footer from "@/app/(home)/_components/sections/Footer";
import Header from "@/app/(home)/_components/sections/Header";
import Projects from "@/app/(home)/_components/sections/Projects";

export default function Home() {
  return (
    <div className="animate-in fade-in mx-auto flex max-w-(--breakpoint-lg) flex-col gap-x-28 px-12 duration-300 ease-in lg:flex-row">
      <Header />
      <main className="space-y-24 py-8 lg:py-24">
        <About />
        <Experiences />
        <Education />
        <Awards />
        <Projects />
        <Footer />
      </main>
    </div>
  );
}
