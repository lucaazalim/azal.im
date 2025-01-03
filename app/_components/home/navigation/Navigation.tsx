import NavigationItem from "@/app/_components/home/navigation/NavigationItem";

export default function Navigation() {
    return (
        <nav>
            <ul className="hidden lg:block">
                <NavigationItem href="#about" title="About"/>
                <NavigationItem href="#experience" title="Experience"/>
                <NavigationItem href="#education" title="Education"/>
                <NavigationItem href="#awards" title="Awards"/>
                <NavigationItem href="#projects" title="Projects"/>
                <NavigationItem href="blog" title="Blog"/>
            </ul>
        </nav>
    );
}