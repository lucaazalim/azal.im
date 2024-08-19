import Image from "next/image";
import NavigationItem from "@/app/components/navigation/NavigationItem";
import SocialItem from "@/app/components/navigation/SocialItem";
import {SiGithub, SiInstagram, SiLinkedin} from "@icons-pack/react-simple-icons";
import {Utensils} from "lucide-react";

export default function Header() {
    return (
        <header className="lg:sticky lg:top-0 lg:max-h-screen pt-12 lg:pt-24 lg:pb-24 flex flex-col justify-between">
            <div className="space-y-12">
                    <Image src="/avatar.png" alt="" width={200} height={200}
                           className="rounded-full hover:scale-110 transition-transform"/>
                <div>
                    <h1 className="text-5xl font-bold text-nowrap">Luca Azalim</h1>
                    <h2 className="text-xl text-nowrap">Software Engineer</h2>
                </div>
                <nav>
                    <ul className="hidden lg:block">
                        <NavigationItem section="about" title="About"/>
                        <NavigationItem section="experience" title="Item"/>
                        <NavigationItem section="education" title="Education"/>
                        <NavigationItem section="honors" title="Awards"/>
                    </ul>
                </nav>
            </div>
            <div className="space-y-4">
                <a href="mailto:luca@azal.im">luca@azal.im</a>
                <ul className="flex gap-4">

                    <SocialItem
                        icon={SiLinkedin}
                        href="https://www.linkedin.com/in/lucaazalim"
                    />

                    <SocialItem
                        icon={SiGithub}
                        href="https://github.com/lucaazalim"/>

                    <SocialItem
                        icon={SiInstagram}
                        href="https://www.instagram.com/lucaazalim"/>

                    <SocialItem
                        icon={Utensils}
                        href="https://www.instagram.com/comidasdoluca"/>

                </ul>
            </div>
        </header>
    );
}