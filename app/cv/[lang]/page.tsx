import { Language } from "@/lib/types";
import { cn } from "@/lib/utils";
import PageWrapper from "../../_components/header/PageWrapper";
import { Button } from "../../_components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV",
  description: "Download my CV in English or Portuguese. Software Engineer with experience in full-stack development and modern web technologies.",
  openGraph: {
    title: "CV - Luca Azalim",
    description: "Download my CV in English or Portuguese. Software Engineer with experience in full-stack development and modern web technologies.",
    url: "https://azal.im/cv",
    type: "website",
  },
  twitter: {
    title: "CV - Luca Azalim",
    description: "Download my CV in English or Portuguese. Software Engineer with experience in full-stack development and modern web technologies.",
  },
};

export const cv: {
  id: Language;
  name: string;
  label: string;
  url: string;
}[] = [
  {
    id: "en",
    name: "english",
    label: "🌎 English",
    url: "/cv/en.pdf",
  },
  {
    id: "pt",
    name: "portuguese",
    label: "🇧🇷 Portuguese",
    url: "/cv/pt.pdf",
  },
];

export default function CV({
  params,
}: {
  params: { lang: string };
}) {
  const currentLanguage = (params.lang as Language) || "en";

  return (
    <PageWrapper className="mx-auto flex max-w-xl flex-col items-center space-y-10 pt-10">
      <div className="grid w-full grid-cols-2">
        {cv.map((c) => (
          <Link key={c.id} href={`/cv/${c.id}`}>
            <Button
              variant="outline"
              size="lg"
              className={cn("w-full", {
                "opacity-50": currentLanguage !== c.id,
              })}
            >
              {c.label}
            </Button>
          </Link>
        ))}
      </div>
      <iframe
        className="animate-in slide-in-from-bottom-10 fade-in h-[75vh] w-[80vw] grow duration-1000"
        src={cv.find((c) => c.id === currentLanguage)?.url}
        title={`CV in ${currentLanguage === "en" ? "English" : "Portuguese"}`}
      ></iframe>
    </PageWrapper>
  );
} 