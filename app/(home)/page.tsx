import About from "@/app/(home)/_components/sections/About";
import Aside from "@/app/(home)/_components/sections/Aside";
import Awards from "@/app/(home)/_components/sections/Awards";
import Education from "@/app/(home)/_components/sections/Education";
import Experiences from "@/app/(home)/_components/sections/Experiences";
import Footer from "@/app/(home)/_components/sections/Footer";
import Projects from "@/app/(home)/_components/sections/Projects";
import TechSkills from "./_components/sections/TechSkills";

export default function Home() {
  return (
    <div className="animate-in fade-in mx-auto flex max-w-5xl flex-col px-12 duration-300 ease-in lg:flex-row lg:divide-x-1 lg:divide-dashed">
      <Aside />
      <main className="space-y-24 py-8 lg:py-20 lg:pl-14">
        <About />
        <TechSkills />
        <Experiences />
        <Education />
        <Awards />
        <Projects />
        <Footer />
      </main>
    </div>
  );
}
