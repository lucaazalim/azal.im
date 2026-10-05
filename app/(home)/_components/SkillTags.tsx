import { Badge } from "@/app/_components/ui/badge";

/** Compact skill list for an experience or education entry. */
export default function SkillTags({ skills }: { skills: string[] }) {
  if (skills.length === 0) {
    return null;
  }

  return (
    <ul aria-label="Skills" className="flex flex-wrap gap-1.5">
      {skills.map((skill) => (
        <li key={skill}>
          <Badge
            variant="outline"
            className="text-muted-foreground border-foreground/15 font-normal"
          >
            {skill}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
