import About from "@/app/(home)/_components/sections/About";
import Aside from "@/app/(home)/_components/sections/Aside";
import Awards from "@/app/(home)/_components/sections/Awards";
import Education from "@/app/(home)/_components/sections/Education";
import Experiences from "@/app/(home)/_components/sections/Experiences";
import Projects from "@/app/(home)/_components/sections/Projects";
import { BASE_URL } from "@/lib/constants";
import { Metadata } from "next";
import { Person, WithContext } from "schema-dts";
import TechSkills from "./_components/sections/TechSkills";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Software Engineer passionate about building scalable applications. Explore my experience, projects, and insights on software development.",
  openGraph: {
    title: "Luca Azalim - Software Engineer",
    description:
      "Software Engineer passionate about building scalable applications. Explore my experience, projects, and insights on software development.",
    url: BASE_URL,
  },
  twitter: {
    title: "Luca Azalim - Software Engineer",
    description:
      "Software Engineer passionate about building scalable applications. Explore my experience, projects, and insights on software development.",
  },
};

const jsonLd: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Luca Azalim",
  jobTitle: "Software Engineer",
  description:
    "Software Engineer passionate about building scalable applications.",
  url: BASE_URL,
  knowsAbout: [
    "Software Engineering",
    "Full-Stack Development",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
  ],
};

export default function Home() {
  return (
    <>
      <script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="animate-in fade-in mx-auto flex max-w-5xl flex-col px-12 duration-300 ease-out lg:flex-row lg:divide-x-1 lg:divide-dashed">
        <Aside />
        <div className="space-y-24 py-8 lg:py-14 lg:pl-14">
          <About />
          <TechSkills />
          <Experiences />
          <Education />
          <Awards />
          <Projects />
        </div>
      </div>
    </>
  );
}
