import Item from "@/app/(home)/_components/Item";
import SectionTitle from "@/app/(home)/_components/SectionTitle";
import { Button } from "@/app/_components/ui/button";
import { ROUTES } from "@/lib/constants";
import { formatYearMonthRange } from "@/lib/dates";
import {
  education,
  formatDegree,
  isInProgress,
} from "@/lib/education/education";
import Link from "next/link";

export default function Education() {
  return (
    <section id="education" className="group/section scroll-mt-24 space-y-10">
      <SectionTitle>Education</SectionTitle>

      {education.map((entry) => (
        <Item
          key={`${entry.school.name}-${entry.startDate}`}
          date={formatYearMonthRange(entry.startDate, entry.endDate)}
          dateNote={isInProgress(entry) ? "Expected" : undefined}
          title={formatDegree(entry)}
          subtitle={entry.school.name}
          skills={entry.skills}
        >
          <Link href={ROUTES.academics}>
            <Button variant="outline">Check all my grades</Button>
          </Link>
        </Item>
      ))}
    </section>
  );
}
