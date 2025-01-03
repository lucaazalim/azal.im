"use client";

import {ReactNode} from "react";
import Skills from "@/app/_components/Skills";
import Image from "next/image";
import Badge from "@/app/_components/Badge";
import {ArrowUpRight} from "lucide-react";
import {useImageView} from "@/app/_components/image-view/ImageViewContext";

type ExperienceProps = {
    date: string;
    image?: string;
    badge?: string;
    title: string;
    subtitle: string;
    link?: string;
    skills?: string[];
    children?: ReactNode;
}

export default function Item({
                                 date,
                                 image,
                                 badge,
                                 title,
                                 subtitle,
                                 link,
                                 skills,
                                 children
                             }: ExperienceProps) {

    const {setPath} = useImageView();

    return <div>
        <a href={link} target='_blank'>
            <div
                className="relative group/container lg:hover:scale-[101%] lg:hover:bg-white/5 lg:hover:bg-gradient-to-br from-white/10 to-white/1 border-t-[1px] lg:hover:border-t-white/20 lg:hover:border-b-black/50 lg:border-transparent lg:hover:!opacity-100 lg:group-hover/section:opacity-50 rounded-lg p-8 transition-all border border-white/10">
                <div className="grid md:grid-cols-[0.3fr,0.7fr] gap-5">
                    <div className="flex flex-col max-lg:flex-col-reverse gap-4">
                        {image &&
                            <Image
                                src={image} alt="" width={300} height={300}
                                onClick={(e) => {
                                    setPath(image);
                                    e.preventDefault();
                                }}
                                className="cursor-zoom-in border-2 object-coverrounded-sm border-foreground/30"
                            />
                        }
                        <p className="mt-1 text-xs font-semibold text-wrap">{date}</p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between gap-2">
                            <div className="flex items-center space-x-2">
                                {badge &&
                                    <Badge>{badge}</Badge>
                                }
                                <div>
                                    <div className="relative flex w-fit flex-row items-center gap-2">
                                        <p>{title}</p>
                                        {link &&
                                            <ArrowUpRight className="
                                                absolute size-5 transition-all
                                                top-0 -right-6 lg:top-2 lg:-right-4
                                                lg:group-hover/container:top-0 lg:group-hover/container:-right-6
                                                lg:opacity-0 group-hover/container:opacity-100"
                                            />
                                        }
                                    </div>
                                    <p className="text-sm text-foreground-muted">{subtitle}</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-sm text-foreground-muted space-y-4">
                            {children}
                        </div>
                        {skills && <Skills skills={skills}/>}
                    </div>
                </div>
            </div>
        </a>
    </div>
        ;

}