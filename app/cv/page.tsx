"use client";

import { Language } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import PageWrapper from "../_components/header/PageWrapper";
import { Button } from "../_components/ui/button";

const cv: {
  id: Language;
  name: string;
  label: string;
  url: string;
}[] = [
  {
    id: "en",
    name: "english",
    label: "🌎 English",
    url: "/cv-en.pdf",
  },
  {
    id: "pt",
    name: "portuguese",
    label: "🇧🇷 Portuguese",
    url: "/cv-pt.pdf",
  },
];

export default function CV() {
  const [language, setLanguage] = useState<Language>("en");

  return (
    <PageWrapper className="mx-auto flex max-w-xl flex-col items-center py-10">
      <div className="grid w-full grid-cols-2">
        {cv.map((c) => (
          <Button
            key={c.id}
            variant="outline"
            size="lg"
            className={cn("", {
              "opacity-50": language !== c.id,
            })}
            onClick={() => setLanguage(c.id)}
          >
            {c.label}
          </Button>
        ))}
      </div>
      <iframe
        className="animate-in slide-in-from-bottom-10 fade-in h-[75vh] w-[80vw] grow duration-1000"
        src={cv.find((c) => c.id === language)?.url}
      ></iframe>
    </PageWrapper>
  );
}
