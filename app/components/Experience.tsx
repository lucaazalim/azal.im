import {ReactNode} from "react";

type ExperienceProps = {
    fromYear: number;
    toYear?: number;
    title: string;
    institution: string;
    children?: ReactNode;
}

export default function Experience({fromYear, toYear, title, institution, children}: ExperienceProps) {
    return (
        <div className="grid lg:grid-cols-[0.2fr,0.8fr] gap-5">
            <p className="text-nowrap text-xs font-semibold">{fromYear} – {toYear || 'PRESENT'}</p>
            <div className="space-y-3">
                <div>
                    <p>{title}</p>
                    <p className="text-sm text-foreground-faded">{institution}</p>
                </div>
                <div className="text-foreground-faded space-y-4 text-sm">{children}</div>
            </div>
        </div>
    )
}