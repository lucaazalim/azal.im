import { getCourses, MAX_PERIODS } from "@/lib/major/major";
import PageHeader from "../_components/header/PageHeader";
import PageHeaderDescription from "../_components/header/PageHeaderDescription";
import PageHeaderTag from "../_components/header/PageHeaderTag";
import PageHeaderTitle from "../_components/header/PageHeaderTitle";
import MajorProgressBar from "./_components/MajorProgressBar";
import PeriodSection from "./_components/PeriodSection";

export default function Page() {
  const courses = getCourses();

  return (
    <div className="mx-auto space-y-10 px-10 pb-10">
      <PageHeader>
        <PageHeaderTag>Major</PageHeaderTag>
        <PageHeaderTitle>Check my grades</PageHeaderTitle>
        <PageHeaderDescription className="max-w-xl">
          A detailed list of all courses and grades from my Software Engineering
          degree at PUC Minas.
        </PageHeaderDescription>
      </PageHeader>
      <div className="space-y-10">
        <div className="">
          <MajorProgressBar />
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {Array.from({ length: MAX_PERIODS }, (_, index) => (
            <PeriodSection
              key={index}
              period={index + 1}
              courses={courses.filter((course) => course.period === index + 1)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
