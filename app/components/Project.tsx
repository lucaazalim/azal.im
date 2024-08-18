import {ReactNode} from "react";
import Skills from "@/app/components/Skills";
import {ExternalLink} from "lucide-react";
import Image from "next/image";

type ProjectProps = {
    fromYear: number;
    toYear?: number;
    image: string;
    title: string;
    link?: string;
    institution: string;
    skills?: string[];
    children?: ReactNode;
}

export default function Project({fromYear, toYear, image, title, link, institution, skills, children}: ProjectProps) {
    return (
        <div className="grid sm:grid-cols-[0.3fr,0.7fr] gap-5">
            <div className="flex flex-col gap-4">
                <Image
                    src={image} alt="" width={300} height={300}
                    className="rounded-sm border-2 border-foreground/30"
                />
                <p className="text-nowrap text-xs font-semibold">{fromYear} – {toYear || 'PRESENT'}</p>
            </div>
            <div className="space-y-4">
                <div className="flex items-center space-x-2">
                    <div>
                        <div className="flex items-center gap-1">
                            <p>{title}</p>
                            {link &&
                                <a target="_blank" href={link}>
                                    <ExternalLink size={16}/>
                                </a>
                            }
                        </div>
                        <p className="text-sm text-foreground-faded">{institution}</p>
                    </div>
                </div>
                <div className="text-foreground-faded space-y-4 text-sm">{children}</div>
                {skills && <Skills skills={skills}/>}
            </div>
        </div>
    )
}