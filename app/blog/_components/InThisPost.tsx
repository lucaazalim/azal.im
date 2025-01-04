"use client";

import Link from "next/link";
import {Post} from "@/app/blog/_lib/posts";
import {useEffect, useState} from "react";

type Props = {
    post: Post;
}

export default function InThisPost({post}: Props) {

    const [activeHeading, setActiveHeading] = useState<string | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries
                    .filter(entry => entry.isIntersecting)
                    .forEach((entry) => {
                        setActiveHeading(entry.target.id);
                    });
            }
        );

        const headings = document.querySelectorAll('h2[id]');
        headings.forEach((heading) => observer.observe(heading));

        return () => {
            headings.forEach((heading) => observer.unobserve(heading));
        };

    }, []);

    return <div className="space-y-3">
        <h2 className="text-lg font-semibold">On this post</h2>
        <ol className="space-y-2">
            {post.headings
                .filter(heading => heading.level === 1)
                .map((heading, index) =>
                    <li key={heading.slug} className={
                        "text-sm  transition-all " + (activeHeading === heading.slug ? "font-semibold text-foreground" : "text-foreground-muted")
                    }>
                        <Link href={`#${heading.slug}`}>
                            {heading.title}
                        </Link>
                    </li>
                )}
        </ol>
    </div>;

}