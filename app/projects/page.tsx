import { projects } from "@/data/projects/projects";
import { BASE_URL, routes } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Sparkles, SquareArrowOutUpRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { CollectionPage, WithContext } from "schema-dts";
import PageHeader from "../_components/header/PageHeader";
import PageHeaderDescription from "../_components/header/PageHeaderDescription";
import PageHeaderTag from "../_components/header/PageHeaderTag";
import PageHeaderTitle from "../_components/header/PageHeaderTitle";
import PageWrapper from "../_components/header/PageWrapper";
import MacOSImageFrame from "../_components/MacOSImageFrame";
import { Badge } from "../_components/ui/badge";
import { buttonVariants } from "../_components/ui/button";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of projects I've worked on, from personal experiments to professional applications and open-source contributions.",
  keywords: [
    "projects",
    "portfolio",
    "software development",
    "web applications",
    "open source",
  ],
  openGraph: {
    title: "Projects - Luca Azalim",
    description:
      "A collection of projects I've worked on, from personal experiments to professional applications and open-source contributions.",
    url: BASE_URL + routes.projects(),
    type: "website",
  },
  twitter: {
    title: "Projects - Luca Azalim",
    description:
      "A collection of projects I've worked on, from personal experiments to professional applications and open-source contributions.",
    card: "summary_large_image",
    images: [BASE_URL + "/projects/pollmodoro.png"],
  },
};

export default function Page() {
  const structuredData: WithContext<CollectionPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects - Luca Azalim",
    description:
      "A collection of projects I've worked on, from personal experiments to professional applications and open-source contributions.",
    url: BASE_URL + routes.projects(),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "SoftwareApplication",
        position: index + 1,
        name: project.title,
        description: project.description,
        applicationCategory: "WebApplication",
        programmingLanguage: project.skills,
        publisher: {
          "@type": "Person",
          name: "Luca Azalim",
        },
        ...(project.urls.live && { url: project.urls.live }),
        ...(project.urls.sourceCode && {
          codeRepository: project.urls.sourceCode,
        }),
      })),
    },
    author: {
      "@type": "Person",
      name: "Luca Azalim",
      url: BASE_URL,
    },
  };

  return (
    <>
      <script
        id="projects-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageWrapper className="mx-auto max-w-7xl">
        <PageHeader className="border-x-1">
          <PageHeaderTag>Projects</PageHeaderTag>
          <PageHeaderTitle>What I Built</PageHeaderTitle>
          <PageHeaderDescription>
            A collection of projects I've worked on, from personal experiments
            to professional applications and open-source contributions.
          </PageHeaderDescription>
        </PageHeader>
        <main className="animate-in fade-in grid grid-cols-1 border-b-1 duration-750 ease-in-out">
          {projects.map((project, index) => (
            <article
              key={`${project.title}-${index}`}
              className="grid grid-cols-1 gap-10 border-x-1 border-t-1 p-10 lg:grid-cols-[0.4fr_0.6fr]"
              itemScope
              itemType="https://schema.org/SoftwareApplication"
            >
              <section className="project-media">
                <MacOSImageFrame
                  src={project.image[0]}
                  alt={`${project.title} project screenshot`}
                  width={1280}
                  height={720}
                  mode="compact"
                />
              </section>
              <section className="flex h-full flex-col justify-between gap-10">
                <div className="space-y-5">
                  <header>
                    <h2 className="text-3xl font-bold" itemProp="name">
                      {project.title}
                    </h2>
                    {project.subtitle && (
                      <p
                        className="text-muted-foreground font-mono text-sm uppercase"
                        itemProp="publisher"
                      >
                        {project.subtitle}
                      </p>
                    )}
                  </header>
                  <div
                    className="flex flex-wrap items-center gap-2"
                    role="list"
                    aria-label="Technologies used"
                  >
                    {project.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        role="listitem"
                        itemProp="programmingLanguage"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <p
                    className="text-muted-foreground font-light text-wrap"
                    itemProp="description"
                  >
                    {project.description}
                  </p>
                </div>
                <nav
                  className="flex flex-wrap gap-2 place-self-end"
                  aria-label="Project links"
                >
                  {project.urls.live && (
                    <Link
                      href={project.urls.live}
                      target="_blank"
                      className={cn(buttonVariants())}
                      itemProp="url"
                    >
                      <SquareArrowOutUpRight />
                      Live
                    </Link>
                  )}
                  {project.urls.sourceCode && (
                    <Link
                      href={project.urls.sourceCode}
                      target="_blank"
                      className={cn(buttonVariants({ variant: "outline" }))}
                      itemProp="codeRepository"
                    >
                      <SiGithub />
                      Source Code
                    </Link>
                  )}
                  {project.urls.specialPage && (
                    <Link
                      href={project.urls.specialPage}
                      className={cn(buttonVariants({ variant: "outline" }))}
                    >
                      <Sparkles />
                      Learn More
                    </Link>
                  )}
                </nav>
              </section>
            </article>
          ))}
        </main>
      </PageWrapper>
    </>
  );
}
