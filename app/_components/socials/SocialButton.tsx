import { IconType } from "@icons-pack/react-simple-icons";
import { LucideIcon } from "lucide-react";
import { AnchorHTMLAttributes } from "react";

type Props = {
  icon: IconType | LucideIcon;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function SocialButton({ icon: Icon, href, ...props }: Props) {
  return (
    <a href={href} {...props}>
      <div className="bg-accent hover:border-foreground/20 group flex aspect-square items-center justify-center border-1 p-2 transition-colors duration-300 ease-in-out">
        <Icon className="text-foreground size-5" />
      </div>
    </a>
  );
}
