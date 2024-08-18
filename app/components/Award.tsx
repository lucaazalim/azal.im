import {ReactNode} from "react";
import Badge from "@/app/components/Badge";

type HonorProps = {
    year: number;
    title: string;
    institution: string;
    count?: number;
    children?: ReactNode;
}

export default function Award({year, title, institution, count = 1, children}: HonorProps) {
    return (
        <div className="grid lg:grid-cols-[0.2fr,0.8fr] gap-5">
            <p className="text-nowrap text-xs font-semibold">{year}</p>
            <div className="space-y-3">
                <div className="flex items-center space-x-2">
                    {count > 1 &&
                        <Badge>{count}x</Badge>
                    }
                    <div>
                        <div className="flex items-center">
                            <p>{title}</p>
                        </div>
                        <p className="text-sm text-foreground-faded">{institution}</p>
                    </div>
                </div>
                <div className="text-foreground-faded space-y-4 text-sm">{children}</div>
            </div>
        </div>
    )
}