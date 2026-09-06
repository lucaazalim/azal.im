import EntryHeader from "@/app/(home)/_components/EntryHeader";
import ExperienceSkills from "@/app/(home)/_components/ExperienceSkills";
import { itemCardClassName } from "@/app/(home)/_components/Item";
import RichText from "@/app/_components/RichText";
import { Description, Experience } from "@/lib/experiences/types";
import { cn } from "@/lib/utils";

type Props = {
  experience: Experience;
  /** Pre-formatted, e.g. `Jul 2025 – Present`. */
  dateRange: string;
  /** Pre-formatted, e.g. `1 yr 3 mos`. */
  duration: string;
  /** Pre-formatted, e.g. `Orlando, Florida, United States · Remote`. */
  location: string | null;
};

export default function ExperienceItem({
  experience,
  dateRange,
  duration,
  location,
}: Props) {
  if (experience.type === "career-break") {
    return (
      <article className={cn(itemCardClassName, "border-dashed")}>
        <div className="space-y-4">
          <EntryHeader
            title={experience.title}
            subtitle="Career break"
            dateRange={dateRange}
            dateNote={duration}
            location={location}
          />
          {experience.description && (
            <DescriptionBlock description={experience.description} />
          )}
        </div>
      </article>
    );
  }

  const { title, company, description, skills } = experience;

  return (
    <article className={itemCardClassName}>
      <div className="space-y-4">
        <EntryHeader
          title={title}
          subtitle={
            company.url ? (
              <a
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                {company.name}
              </a>
            ) : (
              company.name
            )
          }
          dateRange={dateRange}
          dateNote={duration}
          location={location}
        />
        <DescriptionBlock description={description.full} />
        {skills.length > 0 && <ExperienceSkills skills={skills} />}
      </div>
    </article>
  );
}

function DescriptionBlock({ description }: { description: Description }) {
  return (
    <div className="text-muted-foreground space-y-3 text-sm">
      {description.paragraphs.map((paragraph, index) => (
        <p key={index}>
          <RichText text={paragraph} />
        </p>
      ))}
      {description.highlights.length > 0 && (
        <ul className="list-disc space-y-2 pl-5">
          {description.highlights.map((highlight, index) => (
            <li key={index}>
              <RichText text={highlight} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
