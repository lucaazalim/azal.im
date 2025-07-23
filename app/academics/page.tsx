import { getCourses, SEMESTERS } from "@/lib/academics/academics";
import { BASE_URL, ROUTES } from "@/lib/constants";
import { Metadata } from "next";
import PageHeader from "../_components/header/PageHeader";
import PageHeaderDescription from "../_components/header/PageHeaderDescription";
import PageHeaderTag from "../_components/header/PageHeaderTag";
import PageHeaderTitle from "../_components/header/PageHeaderTitle";
import PageWrapper from "../_components/header/PageWrapper";
import MajorProgressBar from "./_components/MajorProgressBar";
import SemesterSection from "./_components/SemesterSection";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "A detailed list of all courses and grades from my Software Engineering degree at PUC Minas. Track my academic progress and achievements.",
  openGraph: {
    title: "Academics - Luca Azalim",
    description:
      "A detailed list of all courses and grades from my Software Engineering degree at PUC Minas. Track my academic progress and achievements.",
    url: BASE_URL + ROUTES.academics,
    type: "website",
  },
  twitter: {
    title: "Academics - Luca Azalim",
    description:
      "A detailed list of all courses and grades from my Software Engineering degree at PUC Minas. Track my academic progress and achievements.",
  },
};

export default function Page() {
  const courses = getCourses();

  return (
    <PageWrapper className="mx-auto">
      <PageHeader>
        <PageHeaderTag>Academics</PageHeaderTag>
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
          {Array.from({ length: SEMESTERS }, (_, index) => (
            <SemesterSection
              key={index}
              semester={index + 1}
              courses={courses.filter(
                (course) => course.semester === index + 1,
              )}
            />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
