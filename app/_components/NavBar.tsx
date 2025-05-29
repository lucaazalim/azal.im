"use client";

import { routes } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

function matches(pathname: string, href: string): boolean {
  return href === routes.home
    ? pathname === routes.home
    : pathname.startsWith(href);
}

export default function NavBar() {
  const pathname = usePathname();

  return (
    <div className="bg-background/30 fixed top-0 left-0 z-50 h-[var(--navbar-height)] w-full border-b backdrop-blur-sm backdrop-saturate-150">
      <nav className="mx-auto flex h-full w-full max-w-5xl items-center justify-between p-3">
        {/* Desktop Navigation */}
        <ol className="flex w-full items-center justify-center gap-4 max-md:hidden">
          {menu.map((item) => (
            <li key={item.name} className="mr-4 inline-block">
              <Link
                href={item.href}
                className={cn(
                  "font-semibold drop-shadow-sm",
                  matches(pathname, item.href)
                    ? "text-foreground"
                    : "text-foreground/50 hover:text-foreground transition-colors duration-200",
                )}
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
                    className={cn(
                      "rounded-md px-4 py-2 font-semibold transition-colors duration-200",
                      matches(pathname, item.href)
                        ? "text-foreground"
                        : "text-foreground/70 hover:text-foreground hover:bg-accent/50",
                    )}
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
