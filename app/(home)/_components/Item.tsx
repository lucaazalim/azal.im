"use client";

import { useImageView } from "@/app/(home)/_components/image-view/ImageViewContext";
import Skills from "@/app/(home)/_components/Skills";
import { Badge } from "@/app/_components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

type ExperienceProps = {
  date: string;
  image?: string;
  badge?: string;
  title: string;
  subtitle: string;
  link?: string;
  skills?: string[];
  children?: ReactNode;
};

export default function Item({
  date,
  image,
  badge,
  title,
  subtitle,
  link,
  skills,
  children,
}: ExperienceProps) {
  const { setPath } = useImageView();

  return (
    <div>
      <a href={link} target="_blank">
        <div className="group/container relative rounded-lg border border-t border-white/10 from-white/10 to-white/1 p-8 transition-all lg:border-transparent lg:group-hover/section:opacity-50 lg:hover:scale-[101%] lg:hover:border-t-white/20 lg:hover:border-b-black/50 lg:hover:bg-white/5 lg:hover:bg-linear-to-br lg:hover:opacity-100!">
          <div className="grid gap-5 md:grid-cols-[0.3fr_0.7fr]">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="mt-1 text-xs font-semibold text-wrap">
                  {date}
                </span>
                {badge && <Badge>{badge}</Badge>}
              </div>
              {image && (
                <Image
                  src={image}
                  alt=""
                  width={300}
                  height={300}
                  onClick={(e) => {
                    setPath(image);
                    e.preventDefault();
                  }}
                  className="object-coverrounded-sm border-foreground/30 cursor-zoom-in border-2"
                />
              )}
            </div>
            <div className="space-y-4">
              <div className="flex justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <div className="flex flex-col gap-2">
                    <div className="relative flex w-fit flex-row items-center gap-2">
                      <span className="font-semibold">{title}</span>
                      {link && (
                        <ArrowUpRight className="absolute top-2 -right-4 hidden size-5 opacity-0 transition-all group-hover/container:top-0 group-hover/container:-right-6 group-hover/container:opacity-100 lg:block" />
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm">{subtitle}</p>
                  </div>
                </div>
              </div>
              <div className="text-muted-foreground space-y-4 text-sm">
                {children}
              </div>
              {skills && <Skills skills={skills} />}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
