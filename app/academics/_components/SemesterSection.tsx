import { Course } from "@/lib/academics/types";
import SemesterCoursesTable from "./SemesterCoursesTable";
import SemesterSummary from "./SemesterSummary";

type Props = {
  semester: number;
  courses: Course[];
};

export default function SemesterSection({ semester, courses }: Props) {
  return (
    <section className="flex flex-col overflow-hidden border">
      <div className="p-5">
        <h2 className="text-xl font-bold">
          {semester}
          {semester === 2 ? "nd" : semester === 3 ? "rd" : "th"} Semester
        </h2>
      </div>

      <div className="grow px-5 pb-5">
        <SemesterCoursesTable courses={courses} />
      </div>
      <SemesterSummary courses={courses} />
    </section>
  );
}
