import { cn } from "@/lib/utils";
import {
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiX,
} from "@icons-pack/react-simple-icons";
import { LucideIcon, Utensils } from "lucide-react";
import { HTMLAttributes } from "react";
import SocialButton from "./SocialButton";

const socials: {
  icon: LucideIcon;
  href: string;
  label: string;
}[] = [
  {
    icon: SiLinkedin,
    href: "https://www.linkedin.com/in/lucaazalim",
    label: "LinkedIn",
  },
  {
    icon: SiGithub,
    href: "https://github.com/lucaazalim",
    label: "GitHub",
  },
  {
    icon: SiX,
    href: "https://x.com/lucaazalim",
    label: "X (Twitter)",
  },
  {
    icon: SiInstagram,
    href: "https://www.instagram.com/lucaazalim",
    label: "Instagram",
  },
  {
    icon: Utensils,
    href: "https://www.instagram.com/comidasdoluca",
    label: "Instagram do Comidas do Luca",
  },
];

type Props = HTMLAttributes<HTMLUListElement>;

export default function Socials({ className, ...props }: Props) {
  return (
    <ul className={cn("flex gap-2", className)} {...props}>
      {socials.map((social) => (
        <li key={social.label} className="grow">
          <SocialButton
            icon={social.icon}
            href={social.href}
            aria-label={social.label}
          />
        </li>
      ))}
    </ul>
  );
}
