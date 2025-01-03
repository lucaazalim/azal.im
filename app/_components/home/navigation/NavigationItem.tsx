import Link from "next/link";
import {ReactNode} from "react";

type NavItemProps = {
    href: string;
    title: string;
}

export default function NavigationItem({href, title}: NavItemProps) {
    return (
        <li>
            <Link href={href} className="
                group h-8
                flex items-center gap-3
                cursor-pointer text-foreground-muted
                hover:text-foreground transition-all
            ">
                <div
                    className="h-0.5 rounded-full w-5 bg-foreground-muted group-hover:w-12 group-hover:bg-foreground transition-all"></div>
                {title}
            </Link>
        </li>
    );
}