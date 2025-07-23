import { BASE_URL, ROUTES } from "@/lib/constants";
import { Language, languageSchema } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { resumes } from "../../../lib/resume/resume";
import PageWrapper from "../../_components/header/PageWrapper";
import { Button } from "../../_components/ui/button";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Download my resume in English or Portuguese. Software Engineer with experience in full-stack development and modern web technologies.",
  openGraph: {
    title: "Resume - Luca Azalim",
    description:
      "Download my resume in English or Portuguese. Software Engineer with experience in full-stack development and modern web technologies.",
    url: BASE_URL + ROUTES.resume(),
    type: "website",
  },
  twitter: {
    title: "Resume - Luca Azalim",
    description:
      "Download my resume in English or Portuguese. Software Engineer with experience in full-stack development and modern web technologies.",
  },
};

export async function generateStaticParams() {
  return Object.keys(resumes).map((lang) => ({
    lang,
  }));
}

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function Page({ params }: Props) {
  let { lang: rawLang } = await params;
  const parsedLang = languageSchema.safeParse(rawLang);

  if (!parsedLang.success) {
    notFound();
  }

  const { data: currentLang } = parsedLang;
  const currentResume = resumes[currentLang];

  return (
    <PageWrapper className="mx-auto flex max-w-xl flex-col items-center space-y-10 pt-10">
      <div className="grid w-full grid-cols-2">
        {Object.entries(resumes).map(([lang, resume]) => (
          <Link key={lang} href={ROUTES.resume(lang as Language)}>
            <Button
              variant="outline"
              size="lg"
              className={cn("w-full", {
                "opacity-50": lang !== currentLang,
              })}
            >
              {resume.label}
            </Button>
          </Link>
        ))}
      </div>
      <iframe
        className="animate-in slide-in-from-bottom-10 fade-in h-[75vh] w-[80vw] grow duration-1000"
        src={currentResume.url}
        title={`resume in ${currentResume.name}`}
      ></iframe>
    </PageWrapper>
  );
}
