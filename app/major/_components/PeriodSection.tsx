import { getPeriodSummary } from "@/lib/major/major";
import { Course } from "@/lib/major/types";
import PeriodCoursesTable from "./PeriodCoursesTable";

type Props = {
  period: number;
  courses: Course[];
};

export default function PeriodSection({ period, courses }: Props) {
  const periodSummary = getPeriodSummary(courses);

  return (
    <section className="flex flex-col overflow-hidden rounded-lg border">
      <div className="p-5">
        <h2 className="text-xl font-bold">{period}th Period</h2>
      </div>

      <div className="grow px-5 pb-5">
        <PeriodCoursesTable courses={courses} />
      </div>
      <div className="grid grid-cols-3 bg-neutral-900 p-5">
        <div className="flex flex-col items-center justify-center gap-1 border-r-2">
          <span className="text-primary text-xl font-bold">Hours</span>
          <span className="">
            {periodSummary.completedHours}/{periodSummary.totalHours}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 border-r-2">
          <span className="text-primary text-xl font-bold">Grade Avg.</span>
          <span className="">
            {periodSummary.averageGrade
              ? Math.round(periodSummary.averageGrade) + "/100"
              : "N/A"}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <span className="text-primary text-xl font-bold">Total hours</span>
          <span className="">
            {courses.reduce((total, course) => total + course.hours, 0)}
          </span>
        </div>
      </div>
    </section>
  );
}
