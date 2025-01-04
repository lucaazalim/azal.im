import Image from "next/image";
import SocialItem from "@/app/_components/navigation/SocialItem";
import {SiGithub, SiInstagram, SiLinkedin} from "@icons-pack/react-simple-icons";
import {Utensils} from "lucide-react";
import Navigation from "@/app/_components/navigation/Navigation";

export default function Header() {
    return (
        <header className="flex flex-col justify-between pt-12 lg:sticky lg:top-0 lg:max-h-screen lg:pt-24 lg:pb-24">
            <div className="space-y-12">
                <Image src="/avatar.png" alt="" width={200} height={200}
                       className="rounded-full transition-transform hover:scale-110"/>
                <div>
                    <h1 className="text-5xl font-bold text-nowrap text-accent">Luca Azalim</h1>
                    <h2 className="text-xl text-nowrap">Software Engineer</h2>
                </div>
                <Navigation/>
            </div>
            <div className="space-y-4">
                <a className="link" href="mailto:luca@azal.im">luca@azal.im</a>
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