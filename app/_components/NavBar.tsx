"use client";

import { routes } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
    name: "CV",
    href: routes.cv,
  },
  {
    name: "Blog",
    href: routes.blog(),
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
    name: "Academics",
    href: routes.academics,
  },
  {
    name: "Contact",
    href: routes.contact,
  },
];

function matches(pathname: string, href: string): boolean {
  return href === routes.home
    ? pathname === routes.home
    : pathname.startsWith(href);
}

function DesktopNavBar() {
  const pathname = usePathname();

  return (
    <ol className="flex w-full items-center justify-center gap-10 max-md:hidden">
      {menu.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href}
            className={cn(
              "font-mono uppercase drop-shadow-sm",
              matches(pathname, item.href)
                ? "text-foreground border-foreground border-b-1"
                : "text-foreground/50 hover:text-foreground transition-colors duration-200",
            )}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ol>
  );
}

function MobileNavBar() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="flex w-full items-center justify-end md:hidden">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <button className="p-2">
            <Menu className="size-6" />
            <span className="sr-only">Open menu</span>
          </button>
        </SheetTrigger>
        <SheetContent side="top" className="bg-background/80 backdrop-blur-sm">
          <SheetHeader className="sr-only">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex h-[90vh] flex-col items-center justify-center gap-5 py-10">
            {menu.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsSheetOpen(false)}
                className={cn(
                  "px-4 py-2 font-mono text-3xl uppercase transition-colors duration-200",
                  matches(pathname, item.href)
                    ? "text-foreground border-foreground border-b-1"
                    : "text-foreground/50 hover:text-foreground hover:bg-accent/50",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default function NavBar() {
  return (
    <nav
      className={cn(
        "animate-in fade-in duration-500 ease-out", // animation
        "flex items-center justify-between", // layout
        "fixed top-0 left-0 z-50 p-3", // positioning
        "h-[var(--navbar-height)] w-full", // size
        "bg-background/80 border-b backdrop-blur-sm backdrop-saturate-150", // background
      )}
    >
      <DesktopNavBar />
      <MobileNavBar />
    </nav>
  );
}
