import NavigationMenu from "@/app/(home)/_components/navigation/NavigationMenu";
import LoadingImage from "@/app/_components/LoadingImage";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";
import OpenToWork from "../../../_components/socials/OpenToWork";
import Socials from "../../../_components/socials/Socials";

export default function Aside() {
  return (
    <aside className="flex flex-col justify-between gap-8 py-12 pr-14 lg:sticky lg:top-[var(--navbar-height)] lg:h-[calc(100vh-var(--navbar-height))] lg:py-10">
      <div className="max-vh-height-md:gap-5 flex flex-col gap-8">
        <div className="max-vh-height-md:size-42 relative size-52">
          <LoadingImage
            src="/avatar.png"
            alt="Luca Azalim Avatar"
            className="rounded-full outline-1 outline-offset-4 drop-shadow-lg drop-shadow-black"
            fill
            priority
          />
        </div>
        <div>
          <h1 className="text-primary space-x-3 text-4xl font-bold text-nowrap">
            Luca Azalim
          </h1>
          <h2 className="text-normal font-mono font-light text-nowrap uppercase">
            Software Engineer
          </h2>
        </div>
        <div className="max-lg:hidden">
          <NavigationMenu />
        </div>
      </div>
      <div className="flex max-w-xs flex-col gap-2">
        <Link href={ROUTES.contact}>
          <OpenToWork />
        </Link>
        <Socials />
      </div>
    </aside>
  );
}
