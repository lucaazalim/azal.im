import EntryMeta from "@/app/(home)/_components/EntryMeta";
import ExternalLink from "@/app/(home)/_components/ExternalLink";
import Section from "@/app/(home)/_components/Section";
import SkillTags from "@/app/(home)/_components/SkillTags";
import { Timeline, TimelineItem } from "@/app/(home)/_components/Timeline";
import { Button } from "@/app/_components/ui/button";
import { ROUTES } from "@/lib/constants";
import { formatYearMonthRange } from "@/lib/dates";
import {
  education,
  formatDegree,
  isInProgress,
} from "@/lib/education/education";
import { ArrowRight, CalendarDays } from "lucide-react";
import Link from "next/link";

export default function Education() {
  return (
    <Section id="education">
      <Timeline>
        {education.map((entry) => {
          const inProgress = isInProgress(entry);
          const { school } = entry;

          return (
            <TimelineItem
              key={`${school.name}-${entry.startDate}`}
              marker={inProgress ? "current" : "past"}
            >
              <article className="space-y-5">
                <header className="space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {formatDegree(entry)}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {school.url ? (
                        <ExternalLink href={school.url} className="font-medium">
                          {school.name}
                        </ExternalLink>
                      ) : (
                        <span className="text-foreground font-medium">
                          {school.name}
                        </span>
                      )}
                      {school.shortName && <> · {school.shortName}</>}
                    </p>
                  </div>
                  <EntryMeta
                    items={[
                      {
                        icon: CalendarDays,
                        label: "Period",
                        text: `${formatYearMonthRange(entry.startDate, entry.endDate)}${inProgress ? " · Expected" : ""}`,
                      },
                    ]}
                  />
                </header>
                <SkillTags skills={entry.skills} />
                <Button asChild variant="outline">
                  <Link href={ROUTES.academics}>
                    Check all my grades
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </article>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Section>
  );
}
