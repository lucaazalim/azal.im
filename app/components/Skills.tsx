import Badge from "@/app/components/Badge";

type SkillsProps = {
    skills: string[];
}

export default function Skills({skills}: SkillsProps) {
    return (
        <div className="flex items-center flex-wrap gap-2">
            {skills.sort((a, b) => a.localeCompare(b)).map((skill, index) =>
                <div key={index} className="flex items-center gap-1">
                    <Badge>{skill}</Badge>
                </div>
            )}
        </div>
    );

}