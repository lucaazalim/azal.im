import ExperienceItem from "@/app/(home)/_components/ExperienceItem";
import SectionTitle from "@/app/(home)/_components/SectionTitle";
import {
  formatYearMonthRange,
  formatYearMonthRangeDuration,
} from "@/lib/dates";
import { experiences, formatLocation } from "@/lib/experiences/experiences";

export default function Experiences() {
  return (
    <section id="experience" className="group/section scroll-mt-24 space-y-10">
      <SectionTitle>Experience</SectionTitle>

      {experiences.map((experience) => (
        <ExperienceItem
          key={`${experience.title}-${experience.startDate}`}
          experience={experience}
          dateRange={formatYearMonthRange(
            experience.startDate,
            experience.endDate,
          )}
          duration={formatYearMonthRangeDuration(
            experience.startDate,
            experience.endDate,
          )}
          location={formatLocation(experience.location)}
        />
      ))}
    </section>
  );
}
