import NavigationItem from "@/app/_components/navigation/NavigationItem";
import { ROUTES } from "@/app/_utils/constants";

export default function Navigation() {
  return (
    <nav>
      <ul className="hidden lg:block">
        <NavigationItem href="#about" title="About" />
        <NavigationItem href="#experience" title="Experience" />
        <NavigationItem href="#education" title="Education" />
        <NavigationItem href="#awards" title="Awards" />
        <NavigationItem href="#projects" title="Projects" />
        <NavigationItem href={ROUTES.BLOG} title="Blog" />
        <NavigationItem href={ROUTES.VIDEOS()} title="Videos" />
      </ul>
    </nav>
  );
}
