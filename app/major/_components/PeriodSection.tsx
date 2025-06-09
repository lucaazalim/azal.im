import { Course } from "@/lib/major/types";
import PeriodCoursesTable from "./PeriodCoursesTable";
import PeriodSummary from "./PeriodSummary";

type Props = {
  period: number;
  courses: Course[];
};

export default function PeriodSection({ period, courses }: Props) {
  return (
    <section className="flex flex-col overflow-hidden border">
      <div className="p-5">
        <h2 className="text-xl font-bold">
          {period}
          {period === 2 ? "nd" : period === 3 ? "rd" : "th"} Period
        </h2>
      </div>

      <div className="grow px-5 pb-5">
        <PeriodCoursesTable courses={courses} />
      </div>
      <PeriodSummary courses={courses} />
    </section>
  );
}
