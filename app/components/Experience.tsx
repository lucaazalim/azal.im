import {ReactNode} from "react";
import {ExternalLink} from "lucide-react";
import Skills from "@/app/components/Skills";
import Container from "@/app/components/Container";

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
        <Container link={link}>
            <div className="grid lg:grid-cols-[0.2fr,0.8fr] gap-5">
                <p className="mt-1 text-nowrap text-xs font-semibold">{fromYear} – {toYear || 'PRESENT'}</p>
                <div className="space-y-4">
                    <div>
                        <p>{title}</p>
                        <div className="flex items-center gap-1">
                            <p className="text-sm text-foreground-faded">{institution}</p>
                        </div>
                    </div>
                    <div className="text-foreground-faded space-y-4 text-sm">{children}</div>
                    {skills && <Skills skills={skills}/>}
                </div>
            </div>
        </Container>
    )
}