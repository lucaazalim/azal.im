import NavigationItem from "@/app/(home)/_components/navigation/NavigationItem";
import { routes } from "@/lib/constants";

export default function NavigationMenu() {
  return (
    <nav>
      <ul className="">
        <div className="hidden pb-6 lg:block">
          <NavigationItem href="#experience" title="Experience" />
          <NavigationItem href="#education" title="Education" />
          <NavigationItem href="#awards" title="Awards" />
          <NavigationItem href="#projects" title="Projects" />
        </div>
        <NavigationItem href={routes.blog} title="Blog" />
        <NavigationItem href={routes.videos()} title="Videos" />
        <NavigationItem href={routes.shows} title="Movies" />
      </ul>
    </nav>
  );
}
