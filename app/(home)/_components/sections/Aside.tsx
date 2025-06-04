import NavigationMenu from "@/app/(home)/_components/navigation/NavigationMenu";
import SocialItem from "@/app/(home)/_components/navigation/SocialItem";
import LoadingImage from "@/app/_components/LoadingImage";
import {
  SiGithub,
  SiInstagram,
  SiLinkedin,
} from "@icons-pack/react-simple-icons";
import { Mail, Utensils } from "lucide-react";

export default function Aside() {
  return (
    <aside className="flex flex-col justify-between gap-8 py-12 pr-14 lg:sticky lg:top-[var(--navbar-height)] lg:h-[calc(100vh-var(--navbar-height))] lg:py-10">
      <div className="space-y-8">
        <LoadingImage
          src="/avatar.png"
          alt=""
          width={200}
          height={200}
          className="rounded-full drop-shadow-lg drop-shadow-black"
        />
        <div>
          <h1 className="text-primary text-4xl font-bold text-nowrap">
            Luca Azalim
          </h1>
          <h2 className="text-lg font-light text-nowrap">Software Engineer</h2>
        </div>
        <NavigationMenu />
      </div>
      <div className="flex flex-col gap-3">
        <ul className="flex gap-4">
          <SocialItem
            icon={Mail}
            href="mailto:luca@azal.im"
            aria-label="E-mail"
          />

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
    </aside>
  );
}
