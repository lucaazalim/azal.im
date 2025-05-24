import NavigationItem from "@/app/(home)/_components/navigation/NavigationItem";
import { routes } from "@/lib/constants";

export default function NavigationMenu() {
  return (
    <nav>
      <ul className="">
        <NavigationItem href="#about" title="About" />
        <NavigationItem href="#experience" title="Experience" />
        <NavigationItem href="#education" title="Education" />
        <NavigationItem href="#awards" title="Awards" />
        <NavigationItem href="#projects" title="Projects" />
        <div className="py-3" />
        <NavigationItem href={routes.blog} title="Blog" />
        <NavigationItem href={routes.videos()} title="Videos" />
        <NavigationItem href={routes.shows} title="Movies" />
      </ul>
    </nav>
  );
}
