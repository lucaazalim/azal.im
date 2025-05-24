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
        className="group text-muted-foreground hover:text-foreground flex h-8 cursor-pointer items-center gap-3 transition-all"
      >
        <div className="bg-muted-foreground group-hover:bg-foreground h-0.5 w-5 rounded-full transition-all group-hover:w-12"></div>
        {title}
      </Link>
    </li>
  );
}
