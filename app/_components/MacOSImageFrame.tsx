import LoadingImage from "@/app/_components/LoadingImage";
import { cn } from "@/lib/utils";
import { ImageProps } from "next/image";

type Props = ImageProps & {
  mode?: "compact" | "normal";
};

export default function MacOSImageFrame({
  alt,
  mode = "normal",
  className,
  ...props
}: Props) {
  return (
    <div className="flex flex-col drop-shadow-xl">
      <div
        className={cn(
          "relative flex h-6 w-full items-center gap-2 rounded-t-lg border-x-1 border-t-1 border-neutral-700 bg-neutral-800",
          {
            "px-2": mode === "compact",
            "px-3.5 md:h-10": mode === "normal",
          },
        )}
      >
        <div
          className={cn(
            "z-10 flex flex-row items-center *:size-2 *:rounded-full",
            {
              "gap-1": mode === "compact",
              "gap-2 *:md:size-3": mode === "normal",
            },
          )}
        >
          <div className="bg-red-400" />
          <div className="bg-yellow-400" />
          <div className="bg-green-400" />
        </div>
        <span
          className={cn(
            "absolute left-1/2 hidden -translate-x-1/2 text-sm text-neutral-400 md:block",
            {
              "sr-only": mode === "compact",
            },
          )}
        >
          {alt}
        </span>
      </div>
      <LoadingImage
        alt={alt}
        className={cn(
          "rounded-b-lg border-x-1 border-b-1 border-neutral-700",
          className,
        )}
        {...props}
      />
    </div>
  );
}
