"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PostHeading } from "../_lib/headings";

type Props = {
  headings: PostHeading[];
};

export default function InThisPost({ headings }: Props) {
  const [activeHeading, setActiveHeading] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry) => {
          setActiveHeading(entry.target.id);
        });
    });

    const headings = document.querySelectorAll("h2[id]");
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, []);

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">On this post</h2>
      <ol className="space-y-2">
        {headings
          .filter((heading) => heading.level === 1)
          .map((heading) => (
            <li
              key={heading.slug}
              className={
                "text-sm  transition-all " +
                (activeHeading === heading.slug
                  ? "text-foreground"
                  : "text-muted-foreground")
              }
            >
              <Link href={`#${heading.slug}`}>
                <div>{heading.title}</div>
              </Link>
            </li>
          ))}
      </ol>
    </div>
  );
}
