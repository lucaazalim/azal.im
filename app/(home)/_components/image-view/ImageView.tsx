"use client";

import { useImageView } from "@/app/(home)/_components/image-view/ImageViewContext";
import LoadingImage from "@/app/_components/LoadingImage";
import { useEffect } from "react";

export default function ImageView() {
  const { path, setPath } = useImageView();

  useEffect(() => {
    if (!path) {
      return;
    }

    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPath(undefined);
      }
    };

    window.addEventListener("keydown", listener);
    document.body.classList.add("overflow-hidden");

    return () => {
      window.removeEventListener("keydown", listener);
      document.body.classList.remove("overflow-hidden");
    };
  }, [path]);

  if (!path) {
    return null;
  }

  return (
    <div
      className="fixed z-1000 flex size-full cursor-zoom-out items-center justify-center bg-black/50 backdrop-blur-xs"
      onClick={() => setPath(undefined)}
    >
      <LoadingImage
        src={path}
        alt="Image"
        fill={true}
        className="object-scale-down"
      />
    </div>
  );
}
