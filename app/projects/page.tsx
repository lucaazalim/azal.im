import { projects } from "@/data/projects/projects";
import { cn } from "@/lib/utils";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Sparkles, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import PageHeader from "../_components/header/PageHeader";
import PageHeaderDescription from "../_components/header/PageHeaderDescription";
import PageHeaderTag from "../_components/header/PageHeaderTag";
import PageHeaderTitle from "../_components/header/PageHeaderTitle";
import PageWrapper from "../_components/header/PageWrapper";
import MacOSImageFrame from "../_components/MacOSImageFrame";
import { Badge } from "../_components/ui/badge";
import { buttonVariants } from "../_components/ui/button";

export default function Page() {
  return (
    <PageWrapper className="mx-auto max-w-7xl">
      <PageHeader className="border-x-1">
        <PageHeaderTag>Projects</PageHeaderTag>
        <PageHeaderTitle>What I Built</PageHeaderTitle>
        <PageHeaderDescription>
          A collection of projects I've worked on, from personal experiments to
          professional applications and open-source contributions.
        </PageHeaderDescription>
      </PageHeader>
      <div className="animate-in fade-in grid grid-cols-1 border-b-1 duration-750 ease-in-out">
        {projects.map((project, index) => (
          <div
            key={`${project.title}-${index}`}
            className="grid grid-cols-1 gap-10 border-x-1 border-t-1 p-10 lg:grid-cols-[0.4fr_0.6fr]"
          >
            <MacOSImageFrame
              src={project.image[0]}
              alt={project.title}
              width={1280}
              height={720}
              mode="compact"
            />
            <div className="flex h-full flex-col justify-between gap-10">
              <div className="space-y-5">
                <div>
                  <h2 className="text-3xl font-bold">{project.title}</h2>
                  {project.subtitle && (
                    <p className="text-muted-foreground font-mono text-sm uppercase">
                      {project.subtitle}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {project.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex}>{skill}</Badge>
                  ))}
                </div>
                <p className="text-muted-foreground font-light text-wrap">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 place-self-end">
                {project.urls.live && (
                  <Link
                    href={project.urls.live}
                    target="_blank"
                    className={cn(buttonVariants())}
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
