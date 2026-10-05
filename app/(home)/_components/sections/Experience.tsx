import ExperienceEntry from "@/app/(home)/_components/ExperienceEntry";
import Section from "@/app/(home)/_components/Section";
import { Timeline } from "@/app/(home)/_components/Timeline";
import { parseYearMonth } from "@/lib/dates";
import { experiences, positions } from "@/lib/experiences/experiences";

export default function Experience() {
  const firstYear = Math.min(
    ...positions.map((position) => parseYearMonth(position.startDate).year),
  );

  return (
    <Section
      id="experience"
      caption={`${positions.length} roles since ${firstYear}`}
    >
      <Timeline>
        {experiences.map((experience) => (
          <ExperienceEntry
            key={`${experience.title}-${experience.startDate}`}
            experience={experience}
          />
        ))}
      </Timeline>
    </Section>
  );
}
