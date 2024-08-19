import {IconType} from "@icons-pack/react-simple-icons";
import {LucideIcon} from "lucide-react";

type SocialItemProps = {
    icon: IconType | LucideIcon;
    href: string;
}

export default function SocialItem({icon: Icon, href}: SocialItemProps) {
    return (
        <li>
            <a href={href} target="_blank" rel="noreferrer" className="bg-red-500 text-foreground-faded hover:text-foreground transition-colors">
                <Icon/>
            </a>
        </li>
    );
}