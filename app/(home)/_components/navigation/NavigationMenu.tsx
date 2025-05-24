import NavigationItem from "@/app/(home)/_components/navigation/NavigationItem";
import { ROUTES } from "@/lib/constants";

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
        <NavigationItem href={ROUTES.BLOG} title="Blog" />
        <NavigationItem href={ROUTES.VIDEOS()} title="Videos" />
        <NavigationItem href={ROUTES.SHOWS} title="Movies" />
      </ul>
    </nav>
  );
}
