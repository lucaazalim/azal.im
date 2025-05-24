import { ROUTES } from "@/lib/constants";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function HomeButton() {
  return (
    <Link
      href={ROUTES.HOME}
      className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
    >
      <ArrowLeft className="h-5 w-5" />
      <span>Home</span>
    </Link>
  );
}
