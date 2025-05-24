import { IconType } from "@icons-pack/react-simple-icons";
import { LucideIcon } from "lucide-react";
import { AnchorHTMLAttributes } from "react";

type SocialItemProps = {
  icon: IconType | LucideIcon;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function SocialItem({ icon: Icon, ...props }: SocialItemProps) {
  return (
    <li>
      <a
        target="_blank"
        rel="noreferrer"
        className="text-muted-foreground hover:text-primary transition-colors"
        {...props}
      >
        <Icon />
      </a>
    </li>
  );
}
