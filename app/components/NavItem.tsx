"use client";

import Link from "next/link";

type NavItemProps = {
    section: string;
    title: string;
}

export default function NavItem({section, title}: NavItemProps) {
    return (
        <li>
            <Link href={`#${section}`}
                  className="h-8 flex items-center gap-3 cursor-pointer text-foreground-faded hover:text-foreground transition-all group">
                <div
                    className="h-0.5 rounded-full w-5 bg-foreground-faded group-hover:w-12 group-hover:bg-foreground transition-all"></div>
                {title}
            </Link>
        </li>
    );
}