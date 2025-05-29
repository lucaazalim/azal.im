import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  label: string;
  href: string;
};

export default function BackButton({ label, href }: Props) {
  return (
    <Link
      href={href}
      className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
    >
      <ArrowLeft className="size-5" />
      <span>{label}</span>
    </Link>
  );
}
