import Badge from "@/app/_components/Badge";

type SkillsProps = {
    skills: string[];
}

export default function Skills({skills}: SkillsProps) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            {skills.map((skill, index) =>
                <div key={index} className="flex items-center gap-1">
                    <Badge>{skill}</Badge>
                </div>
            )}
        </div>
    );

}