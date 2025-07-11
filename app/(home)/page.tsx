import About from "@/app/(home)/_components/sections/About";
import Aside from "@/app/(home)/_components/sections/Aside";
import Awards from "@/app/(home)/_components/sections/Awards";
import Education from "@/app/(home)/_components/sections/Education";
import Experiences from "@/app/(home)/_components/sections/Experiences";
import Projects from "@/app/(home)/_components/sections/Projects";
import TechSkills from "./_components/sections/TechSkills";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Home",
  description: "Software Engineer passionate about building scalable applications. Explore my experience, projects, and insights on software development.",
  openGraph: {
    title: "Luca Azalim - Software Engineer",
    description: "Software Engineer passionate about building scalable applications. Explore my experience, projects, and insights on software development.",
    url: "https://azal.im",
  },
  twitter: {
    title: "Luca Azalim - Software Engineer",
    description: "Software Engineer passionate about building scalable applications. Explore my experience, projects, and insights on software development.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Luca Azalim",
  "jobTitle": "Software Engineer",
  "description": "Software Engineer passionate about building scalable applications and sharing knowledge through writing and open source contributions.",
  "url": "https://azal.im",
  "sameAs": [
    "https://github.com/lucaazalim",
    "https://linkedin.com/in/lucaazalim"
  ],
  "knowsAbout": [
    "Software Engineering",
    "Full-Stack Development",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "90TI"
  },
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Software Engineering"
  }
};

export default function Home() {
  return (
    <>
      <Script
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
