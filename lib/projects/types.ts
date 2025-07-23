export type Project = {
  startedAt: Date;
  endedAt?: Date;
  image: string[];
  title: string;
  subtitle?: string;
  description: string;
  skills: string[];
  urls: {
    specialPage?: string;
    sourceCode?: string;
    live?: string;
  };
};
