import {ReactNode} from "react";
import Skills from "@/app/components/Skills";
import ItemContainer from "@/app/components/ItemContainer";
import Image from "next/image";
import Badge from "@/app/components/Badge";
import {ArrowUpRight} from "lucide-react";

type ExperienceProps = {
    fromYear: number;
    toYear?: number;
    image?: string;
    badge?: string;
    title: string;
    subtitle: string;
    link?: string;
    skills?: string[];
    children?: ReactNode;
}

export default function Item({
                                 fromYear,
                                 toYear,
                                 image,
                                 badge,
                                 title,
                                 subtitle,
                                 link,
                                 skills,
                                 children
                             }: ExperienceProps) {

    return (
        <ItemContainer link={link}>
            <div className="grid lg:grid-cols-[0.4fr,1.6fr] gap-5">
                <div className="flex flex-col gap-4">
                    {image &&
                        <Image
                            src={image} alt="" width={300} height={300}
                            className="object-coverrounded-sm border-2 border-foreground/30"
                        />
                    }
                    <p className="mt-1 text-nowrap text-xs font-semibold">{fromYear} – {toYear || 'PRESENT'}</p>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between gap-2">
                        <div className="flex items-center space-x-2">
                            {badge &&
                                <Badge>{badge}</Badge>
                            }
                            <div>
                                <div className="relative flex flex-row items-center w-fit gap-2">
                                    <p>{title}</p>
                                    {link &&
                                        <ArrowUpRight
                                            className="
                                            absolute size-5 transition-all
                                            top-0 -right-6 lg:top-2 lg:-right-4
                                            lg:group-hover:top-0 lg:group-hover:-right-6
                                            lg:opacity-0 group-hover:opacity-100
                                        "
                                        />
                                    }
                                </div>
                                <p className="text-sm text-foreground-faded">{subtitle}</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-foreground-faded space-y-4 text-sm">
                        {children}
                    </div>
                    {skills && <Skills skills={skills}/>}
                </div>
            </div>
        </ItemContainer>
    )
}