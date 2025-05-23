import NavigationMenu from "@/app/(home)/_components/navigation/NavigationMenu";
import SocialItem from "@/app/(home)/_components/navigation/SocialItem";
import {
  SiGithub,
  SiInstagram,
  SiLinkedin,
} from "@icons-pack/react-simple-icons";
import { Utensils } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex flex-col justify-between gap-5 pt-12 lg:sticky lg:top-0 lg:max-h-screen lg:py-24">
      <div className="space-y-8">
        <Image
          src="/avatar.png"
          alt=""
          width={200}
          height={200}
          className="rounded-full"
        />
        <div>
          <h1 className="text-primary text-5xl font-bold text-nowrap">
            Luca Azalim
          </h1>
          <h2 className="text-xl font-light text-nowrap">Software Engineer</h2>
        </div>
        <NavigationMenu />
      </div>
      <div className="flex flex-col gap-3">
        <a className="link" href="mailto:luca@azal.im">
          luca@azal.im
        </a>
        <ul className="flex gap-4">
          <SocialItem
            icon={SiLinkedin}
            href="https://www.linkedin.com/in/lucaazalim"
            aria-label="LinkedIn"
          />

          <SocialItem
            icon={SiGithub}
            href="https://github.com/lucaazalim"
            aria-label="GitHub"
          />

          <SocialItem
            icon={SiInstagram}
            href="https://www.instagram.com/lucaazalim"
            aria-label="Instagram"
          />

          <SocialItem
            icon={Utensils}
            href="https://www.instagram.com/comidasdoluca"
            aria-label="Instagram do Comidas do Luca"
          />
        </ul>
      </div>
    </header>
  );
}
