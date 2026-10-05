import EntryMeta from "@/app/(home)/_components/EntryMeta";
import ExpandableDescription from "@/app/(home)/_components/ExpandableDescription";
import ExternalLink from "@/app/(home)/_components/ExternalLink";
import SkillTags from "@/app/(home)/_components/SkillTags";
import { TimelineItem } from "@/app/(home)/_components/Timeline";
import {
  formatYearMonthRange,
  formatYearMonthRangeDuration,
} from "@/lib/dates";
import { formatLocation, isCurrent } from "@/lib/experiences/experiences";
import { EMPLOYMENT_TYPES, Experience } from "@/lib/experiences/types";
import { CalendarDays, MapPin } from "lucide-react";

/**
 * A LinkedIn-style experience entry on the homepage timeline: title, company,
 * dates with duration, location, employment type, description and skills.
 */
export default function ExperienceEntry({
  experience,
}: {
  experience: Experience;
}) {
  const period = `${formatYearMonthRange(
    experience.startDate,
    experience.endDate,
  )} · ${formatYearMonthRangeDuration(experience.startDate, experience.endDate)}`;
  const location = formatLocation(experience);

  if (experience.type === "career-break") {
    return (
      <TimelineItem marker="break">
        <article className="space-y-5">
          <header className="space-y-3">
            <h3 className="text-muted-foreground text-lg font-medium tracking-tight">
              Career break
              <span className="text-muted-foreground/70 font-normal">
                {" "}
                · {experience.title}
              </span>
            </h3>
            <EntryMeta
              items={[
                { icon: CalendarDays, label: "Period", text: period },
                { icon: MapPin, label: "Location", text: location },
              ]}
            />
          </header>
          {experience.description && (
            <ExpandableDescription description={experience.description} />
          )}
        </article>
      </TimelineItem>
    );
  }

  const { title, company, employmentType, description, skills } = experience;

  return (
    <TimelineItem marker={isCurrent(experience) ? "current" : "past"}>
      <article className="space-y-5">
        <header className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
            <p className="text-muted-foreground text-sm">
              {company.url ? (
                <ExternalLink href={company.url} className="font-medium">
                  {company.name}
                </ExternalLink>
              ) : (
                <span className="text-foreground font-medium">
                  {company.name}
                </span>
              )}{" "}
              · {EMPLOYMENT_TYPES[employmentType]}
            </p>
            {company.description && (
              <p className="text-muted-foreground/70 text-sm">
                {company.description}
              </p>
            )}
          </div>
          <EntryMeta
            items={[
              { icon: CalendarDays, label: "Period", text: period },
              { icon: MapPin, label: "Location", text: location },
            ]}
          />
        </header>
        <ExpandableDescription description={description.full} />
        <SkillTags skills={skills} />
      </article>
    </TimelineItem>
  );
}
