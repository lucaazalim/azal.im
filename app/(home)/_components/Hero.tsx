import { homeGridClassName } from "@/app/(home)/_components/home";
import Portrait from "@/app/(home)/_components/Portrait";
import SectionNav from "@/app/(home)/_components/SectionNav";
import OpenToWork from "@/app/_components/socials/OpenToWork";
import Socials from "@/app/_components/socials/Socials";
import { Button } from "@/app/_components/ui/button";
import { ROUTES } from "@/lib/constants";
import { resume } from "@/lib/resume/resume";
import { cn } from "@/lib/utils";
import { FileText, Mail } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className={cn(homeGridClassName, "pt-6 pb-12 lg:pt-10 lg:pb-20")}
    >
      <div className="flex flex-col gap-10">
        <Portrait className="w-44 lg:w-full" />
        <SectionNav className="max-lg:hidden" />
      </div>

      <div className="flex flex-col items-start gap-8">
        <Link href={ROUTES.contact}>
          <OpenToWork />
        </Link>

        <div className="space-y-3">
          <h1
            id="hero-title"
            className="text-5xl font-bold tracking-tight sm:text-6xl"
          >
            Luca Azalim
          </h1>
          <p className="flex flex-col gap-1 font-mono text-sm tracking-wider uppercase sm:flex-row sm:gap-3">
            <span className="text-primary">Software Engineer</span>
            <span
              className="text-muted-foreground/50 max-sm:hidden"
              aria-hidden="true"
            >
              /
            </span>
            <span className="text-muted-foreground">{resume.location}</span>
          </p>
        </div>

        <div className="text-muted-foreground max-w-2xl space-y-4 text-lg leading-relaxed">
          <p>
            I&apos;m a software engineer with <Highlight>10+ years</Highlight>{" "}
            of experience building scalable, distributed systems for consumer
            and enterprise products. I{" "}
            <Highlight>own products end-to-end</Highlight>: I make product
            decisions with users and stakeholders, then carry them through
            architecture, delivery, and iteration.
          </p>
          <p>
            At <Company href="https://www.onerail.com">OneRail</Company>, I
            built and continue to evolve the invoicing platform behind{" "}
            <Highlight>millions of deliveries</Highlight> each month, driving
            both product discovery and technical delivery. I also lead
            AI-augmented engineering initiatives for{" "}
            <Highlight>28 contractors</Highlight> at{" "}
            <Company href="https://limestonedigital.com">
              Limestone Digital
            </Company>
            .
          </p>
          <p>
            Before that, I founded{" "}
            <Company href="https://redesky.com">Rede Sky</Company> and led it
            for seven years, turning player feedback into product priorities as
            it grew into Brazil&apos;s largest Minecraft server network, with{" "}
            <Highlight>16M+ registered accounts</Highlight> and a national
            record of <Highlight>8,115 concurrent players</Highlight>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button asChild>
            <Link href={ROUTES.resume}>
              <FileText aria-hidden="true" />
              View resume
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={ROUTES.contact}>
              <Mail aria-hidden="true" />
              Get in touch
            </Link>
          </Button>
          <Socials />
        </div>
      </div>
    </section>
  );
}

function Highlight({ children }: { children: ReactNode }) {
  return <strong className="text-foreground font-medium">{children}</strong>;
}

function Company({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="link decoration-foreground/30 hover:decoration-primary underline underline-offset-4"
    >
      {children}
    </a>
  );
}
