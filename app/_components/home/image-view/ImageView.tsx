"use client";

import {useImageView} from "@/app/_components/home/image-view/ImageViewContext";
import Image from "next/image";
import {useEffect} from "react";

export default function ImageView() {

    const {path, setPath} = useImageView();

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
        <div className="
            fixed size-full z-[1000] cursor-zoom-out
            flex items-center justify-center bg-black/50 backdrop-blur-sm
        " onClick={() => setPath(undefined)}>
            <Image
                src={path}
                alt="Image"
                fill={true}
                className="object-scale-down"/>
        </div>
    )

}