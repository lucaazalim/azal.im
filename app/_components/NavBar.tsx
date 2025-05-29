import { routes } from "@/lib/constants";
import { Menu } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const menu = [
  {
    name: "Home",
    href: routes.home,
  },
  {
    name: "Blog",
    href: routes.blog,
  },
  {
    name: "Videos",
    href: routes.videos(),
  },
  {
    name: "Movies",
    href: routes.movies,
  },
  {
    name: "Major",
    href: routes.major,
  },
];

export default function NavBar() {
  return (
    <div className="bg-background/30 fixed top-0 left-0 z-50 h-[var(--navbar-height)] w-full border-b backdrop-blur-sm backdrop-saturate-150">
      <nav className="mx-auto flex h-full w-full max-w-5xl items-center justify-between p-3">
        {/* Desktop Navigation */}
        <ol className="flex w-full items-center justify-center gap-4 max-md:hidden">
          {menu.map((item) => (
            <li key={item.name} className="mr-4 inline-block">
              <Link
                href={item.href}
                className="text-foreground/50 hover:text-foreground font-semibold transition-colors duration-200"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ol>

        {/* Mobile Navigation */}
        <div className="flex w-full items-center justify-between md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="hover:bg-accent rounded-md p-2 transition-colors">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 px-3">
                {menu.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-foreground/70 hover:text-foreground hover:bg-accent/50 rounded-md px-4 py-2 font-semibold transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
}
