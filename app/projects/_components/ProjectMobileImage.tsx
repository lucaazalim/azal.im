import Image from "next/image";

type Props = {
  src: string;
  alt: string;
};

export default function ProjectMobileImage({ src, alt }: Props) {
  return (
    <div className="relative flex max-w-xs rounded-[2.5rem] border-[8px] border-neutral-800 bg-neutral-800 drop-shadow-xl drop-shadow-black">
      <div className="absolute -start-[11px] top-[72px] h-[32px] w-[3px] rounded-s-lg bg-neutral-800"></div>
      <div className="absolute -start-[11px] top-[124px] h-[46px] w-[3px] rounded-s-lg bg-neutral-800"></div>
      <div className="absolute -start-[11px] top-[178px] h-[46px] w-[3px] rounded-s-lg bg-neutral-800"></div>
      <div className="absolute -end-[11px] top-[142px] h-[64px] w-[3px] rounded-e-lg bg-neutral-800"></div>
      <div className="relative [aspect-ratio:9/19.5] w-xs overflow-hidden rounded-[2rem]">
        <Image src={src} alt={alt} fill={true} />
      </div>
    </div>
  );
}
