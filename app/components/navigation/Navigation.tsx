import NavigationItem from "@/app/components/navigation/NavigationItem";

export default function Navigation() {
    return (
        <nav>
            <ul className="hidden lg:block">
                <NavigationItem section="about" title="About"/>
                <NavigationItem section="experience" title="Experience"/>
                <NavigationItem section="education" title="Education"/>
                <NavigationItem section="awards" title="Awards"/>
                <NavigationItem section="projects" title="Projects"/>
            </ul>
        </nav>
    );
}