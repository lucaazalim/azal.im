import Link from "next/link";

type NavItemProps = {
  href: string;
  title: string;
  className?: string;
};

export default function NavigationItem({
  href,
  title,
  className,
}: NavItemProps) {
  return (
    <li className={className}>
      <Link
        href={href}
        className="group text-muted-foreground hover:text-foreground flex h-8 cursor-pointer items-center gap-3 font-mono font-light uppercase transition-all"
      >
        <div className="bg-muted-foreground group-hover:bg-foreground h-[1px] w-5 transition-all ease-in-out group-hover:w-12"></div>
        {title}
      </Link>
    </li>
  );
}
