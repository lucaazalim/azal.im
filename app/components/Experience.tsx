import {ReactNode} from "react";
import {ExternalLink} from "lucide-react";
import Badge from "@/app/components/Badge";
import Skills from "@/app/components/Skills";

type ExperienceProps = {
    fromYear: number;
    toYear?: number;
    title: string;
    institution: string;
    link?: string;
    skills?: string[];
    children?: ReactNode;
}

export default function Experience({fromYear, toYear, title, institution, link, skills, children}: ExperienceProps) {
    return (
        <div className="grid lg:grid-cols-[0.2fr,0.8fr] gap-5">
            <p className="text-nowrap text-xs font-semibold">{fromYear} – {toYear || 'PRESENT'}</p>
            <div className="space-y-4">
                <div>
                    <p>{title}</p>
                    <div className="flex items-center gap-1">
                        <p className="text-sm text-foreground-faded">{institution}</p>
                        {link &&
                            <a target="_blank" href={link}>
                                <ExternalLink size={16}/>
                            </a>
                        }
                    </div>
                </div>
                <div className="text-foreground-faded space-y-4 text-sm">{children}</div>
                {skills && <Skills skills={skills} />}
            </div>
        </div>
    )
}