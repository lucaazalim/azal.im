import Section from "@/app/(home)/_components/Section";
import {
  formatYears,
  skillGroups,
  yearsOfExperience,
} from "@/lib/skills/skills";
import { Skill } from "@/lib/skills/types";

export default function Skills() {
  return (
    <Section id="skills" caption="Years of hands-on experience">
      <dl className="divide-y divide-dashed">
        {skillGroups.map((group) => (
          <div
            key={group.category}
            className="grid gap-3 py-5 first:pt-0 last:pb-0 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6"
          >
            <dt className="text-muted-foreground font-mono text-xs tracking-wider uppercase sm:pt-1.5">
              {group.category}
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li key={skill.name}>
                    <SkillChip skill={skill} />
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function SkillChip({ skill }: { skill: Skill }) {
  return (
    <span
      title={`Since ${skill.since}`}
      className="flex border text-xs transition-transform select-none hover:scale-[103%]"
    >
      <span className="bg-primary/20 text-primary px-2.5 py-1 font-semibold">
        {skill.name}
      </span>{" "}
      <span className="bg-accent text-foreground/80 px-2.5 py-1">
        {formatYears(yearsOfExperience(skill))}
      </span>
    </span>
  );
}
