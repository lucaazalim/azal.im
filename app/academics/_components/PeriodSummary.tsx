import { getPeriodSummary } from "@/lib/academics/academics";
import { Course } from "@/lib/academics/types";

type Props = {
  courses: Course[];
};

export default function PeriodSummary({ courses }: Props) {
  const periodSummary = getPeriodSummary(courses);

  return (
    <div className="bg-accent grid grid-cols-2 p-5">
      <div className="flex flex-col items-center justify-center gap-1 border-r-2">
        <span className="text-primary text-xl font-bold">Hours</span>
        <span className="">
          {periodSummary.completedHours}/{periodSummary.totalHours}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="text-primary text-xl font-bold">Grade Avg.</span>
        <span className="">
          {periodSummary.averageGrade
            ? Math.round(periodSummary.averageGrade) + "/100"
            : "N/A"}
        </span>
      </div>
    </div>
  );
}
