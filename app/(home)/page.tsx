import Hero from "@/app/(home)/_components/Hero";
import Awards from "@/app/(home)/_components/sections/Awards";
import Education from "@/app/(home)/_components/sections/Education";
import Experience from "@/app/(home)/_components/sections/Experience";
import Skills from "@/app/(home)/_components/sections/Skills";
import { BASE_URL } from "@/lib/constants";
import { education } from "@/lib/education/education";
import { isCurrent, positions } from "@/lib/experiences/experiences";
import { skills } from "@/lib/skills/skills";
import { Metadata } from "next";
import { Person, WithContext } from "schema-dts";

const description =
  "Software Engineer with 10+ years of experience building scalable, distributed systems and owning products end-to-end, from product decisions to production. Explore my experience, skills, education, and awards.";

export const metadata: Metadata = {
  title: "Home",
  description,
  openGraph: {
    title: "Luca Azalim - Software Engineer",
    description,
    url: BASE_URL,
  },
  twitter: {
    title: "Luca Azalim - Software Engineer",
    description,
  },
};

const jsonLd: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Luca Azalim",
  jobTitle: "Software Engineer",
  description:
    "Software Engineer building scalable, distributed systems and owning products end-to-end.",
  url: BASE_URL,
  knowsAbout: [
    "Software Engineering",
    "Product Development",
    "Full-Stack Development",
    "Distributed Systems",
    ...skills.map((skill) => skill.name),
  ],
  worksFor: positions.filter(isCurrent).map((position) => ({
    "@type": "Organization",
    name: position.company.name,
    url: position.company.url,
  })),
  alumniOf: education.map((entry) => ({
    "@type": "CollegeOrUniversity",
    name: entry.school.name,
    url: entry.school.url,
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="animate-in fade-in mx-auto max-w-5xl px-6 duration-300 ease-out sm:px-12">
        <Hero />
        <Skills />
        <Experience />
        <Education />
        <Awards />
      </div>
    </>
  );
}
