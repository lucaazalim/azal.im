import { Language } from "@/lib/types";

export const resumes: {
  [key in Language]: {
    name: string;
    label: string;
    url: string;
  };
} = {
  en: {
    name: "english",
    label: "🌎 English",
    url: "/resume/en.pdf",
  },
  pt: {
    name: "portuguese",
    label: "🇧🇷 Portuguese",
    url: "/resume/pt.pdf",
  },
} as const;
