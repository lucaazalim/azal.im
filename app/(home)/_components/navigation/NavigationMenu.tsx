import NavigationItem from "@/app/(home)/_components/navigation/NavigationItem";

export default function NavigationMenu() {
  return (
    <nav>
      <ul className="">
        <NavigationItem href="#about" title="About" />
        <NavigationItem href="#experience" title="Experience" />
        <NavigationItem href="#education" title="Education" />
        <NavigationItem href="#awards" title="Awards" />
        <NavigationItem href="#projects" title="Projects" />
      </ul>
    </nav>
  );
}
