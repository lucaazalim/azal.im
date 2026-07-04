"use client";

import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

export default function LoadingImage({
  className,
  onLoad,
  alt,
  ...props
}: ImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <Image
      alt={alt}
      onLoad={(event) => {
        setImageLoaded(true);
        onLoad?.(event);
      }}
      className={cn(
        className,
        "transition-opacity duration-500 ease-in-out",
        !imageLoaded && "opacity-0",
      )}
      {...props}
    />
  );
}
