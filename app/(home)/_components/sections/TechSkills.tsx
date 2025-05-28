export default function TechSkills() {
  return (
    <div className="flex flex-wrap items-center gap-2 lg:px-5">
      <Badge skill="Java" years={10} />
      <Badge skill="SQL" years={10} />
      <Badge skill="Docker" years={6} />
      <Badge skill="Node.js" years={5} />
      <Badge skill="PostgreSQL" years={5} />
      <Badge skill="TypeScript" years={3} />
      <Badge skill="React" years={3} />
      <Badge skill="Next.js" years={3} />
      <Badge skill="Tailwind CSS" years={3} />
    </div>
  );
}

type BadgeProps = {
  skill: string;
  years: number;
};

function Badge({ skill, years }: BadgeProps) {
  return (
    <div className="flex flex-row text-xs transition-transform select-none hover:scale-[103%]">
      <div className="bg-primary/25 text-primary rounded-l-full px-2.5 py-1 font-semibold">
        {skill}
      </div>
      <div className="rounded-r-full bg-neutral-800 px-2.5 py-1">
        {(years >= 10 ? "+" : "") + years + (years > 1 ? " yrs." : " yr.")}
      </div>
    </div>
  );
}
