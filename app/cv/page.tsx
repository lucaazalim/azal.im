"use client";

import { Language } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
    <div className="mx-auto flex max-w-xl flex-col items-center space-y-10 p-10">
      <fieldset className="grid w-full grid-cols-2 gap-5 text-center text-xl">
        <legend className="sr-only">Switch language</legend>
        {Object.values(cv).map(({ id, name, label }) => {
          const checked = language === id;

          return (
            <div
              key={id}
              className={cn(
                "bg-accent cursor-pointer space-x-3 rounded-lg border-2 p-4",
                checked &&
                  "outline-primary bg-primary/10 border-primary/20 outline-2 outline-offset-2",
              )}
              onClick={() => setLanguage(id)}
            >
              <input
                className="sr-only cursor-pointer"
                type="radio"
                id={id}
                name={name}
                value={id}
                checked={checked}
                readOnly
              />
              <label htmlFor={id} className="cursor-pointer">
                {label}
              </label>
            </div>
          );
        })}
      </fieldset>
      <iframe
        className="animate-in slide-in-from-bottom-10 fade-in h-[75vh] w-[80vw] grow rounded-lg duration-1000"
        src={cv.find((c) => c.id === language)?.url}
      ></iframe>
    </div>
  );
}
