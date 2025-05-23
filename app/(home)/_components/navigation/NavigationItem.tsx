import Link from "next/link";

type NavItemProps = {
  href: string;
  title: string;
};

export default function NavigationItem({ href, title }: NavItemProps) {
  return (
    <li>
      <Link
        href={href}
        className="
                group h-8
                flex items-center gap-3
                cursor-pointer text-muted-foreground
                hover:text-foreground transition-all
            "
      >
        <div className="w-5 rounded-full transition-all h-0.5 bg-muted-foreground group-hover:bg-foreground group-hover:w-12"></div>
        {title}
      </Link>
    </li>
  );
}
