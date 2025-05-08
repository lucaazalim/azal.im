import Navigation from "@/app/_components/navigation/Navigation";
import SocialItem from "@/app/_components/navigation/SocialItem";
import {
  SiGithub,
  SiInstagram,
  SiLinkedin,
} from "@icons-pack/react-simple-icons";
import { Utensils } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex flex-col gap-5 justify-between pt-12 lg:sticky lg:top-0 lg:max-h-screen lg:py-24">
      <div className="space-y-8">
        <Image
          src="/avatar.png"
          alt=""
          width={150}
          height={150}
          className="rounded-full"
        />
        <div>
          <h1 className="text-5xl font-bold text-nowrap text-accent">
            Luca Azalim
          </h1>
          <h2 className="text-xl text-nowrap">Software Engineer</h2>
        </div>
        <Navigation />
      </div>
      <div className="space-y-4">
        <a className="link" href="mailto:luca@azal.im">
          luca@azal.im
        </a>
        <ul className="flex gap-4">
          <SocialItem
            icon={SiLinkedin}
            href="https://www.linkedin.com/in/lucaazalim"
          />

          <SocialItem icon={SiGithub} href="https://github.com/lucaazalim" />

          <SocialItem
            icon={SiInstagram}
            href="https://www.instagram.com/lucaazalim"
          />

          <SocialItem
            icon={Utensils}
            href="https://www.instagram.com/comidasdoluca"
          />
        </ul>
      </div>
    </header>
  );
}
