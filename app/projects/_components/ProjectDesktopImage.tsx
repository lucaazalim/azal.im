import Image from "next/image";

type Props = {
  src: string;
  alt: string;
};

export default function ProjectDesktopImage({ src, alt }: Props) {
  return (
    <div className="flex w-full max-w-6xl flex-col overflow-hidden rounded-xl border-2 border-neutral-700 drop-shadow-xl drop-shadow-black">
      <div className="relative flex h-6 w-full items-center gap-2 bg-neutral-800 px-3 md:h-10">
        <div className="z-10 flex flex-row items-center gap-2">
          <div className="size-2 rounded-full bg-red-400 md:size-3" />
          <div className="size-2 rounded-full bg-yellow-400 md:size-3" />
          <div className="size-2 rounded-full bg-green-400 md:size-3" />
        </div>
        <span className="absolute left-1/2 hidden -translate-x-1/2 text-sm text-neutral-400 md:block">
          {alt}
        </span>
      </div>
      <figure className="relative aspect-video">
        <Image src={src} alt={alt} fill={true} />
      </figure>
    </div>
  );
}
