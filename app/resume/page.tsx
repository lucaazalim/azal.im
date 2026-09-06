import { BASE_URL, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";
import { Metadata } from "next";
import PageWrapper from "../_components/header/PageWrapper";
import { buttonVariants } from "../_components/ui/button";
import ResumeDocument from "./_components/ResumeDocument";

const description =
  "Software Engineer with 10+ years of experience in full-stack development, distributed systems, and modern web technologies. Read it online or download the PDF.";

export const metadata: Metadata = {
  title: "Resume",
  description,
  openGraph: {
    title: "Resume - Luca Azalim",
    description,
    url: BASE_URL + ROUTES.resume,
    type: "website",
  },
  twitter: {
    title: "Resume - Luca Azalim",
    description,
  },
};

export default function Page() {
  return (
    <PageWrapper className="animate-in fade-in mx-auto flex max-w-[210mm] flex-col items-center gap-6 pt-10 duration-500 ease-out print:max-w-none print:p-0">
      <div className="flex w-full justify-end print:hidden">
        <a
          href={ROUTES.resumePdf}
          download
          className={cn(buttonVariants({ size: "lg" }))}
        >
          <Download />
          Download PDF
        </a>
      </div>
      <ResumeDocument />
    </PageWrapper>
  );
}
