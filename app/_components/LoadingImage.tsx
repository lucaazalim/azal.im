"use client";

import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

export default function LoadingImage({
  className,
  onLoad,
  ...props
}: ImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <Image
      onLoad={() => {
        setImageLoaded(true);
        return onLoad;
      }}
      className={cn(
        className,
        "transition-opacity duration-500 ease-in-out",
        imageLoaded ? "opacity-100" : "opacity-0",
      )}
      {...props}
    />
  );
}
