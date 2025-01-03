"use client";

import {createContext, useContext, useState} from "react";

type ImageViewContext = {
    path: string | undefined;
    setPath: (path: string | undefined) => void;
}

const ImageViewContextDefaultValue: ImageViewContext = {
    path: undefined,
    setPath: () => {}
}

export const ImageViewContext = createContext<ImageViewContext>(ImageViewContextDefaultValue);

export function useImageView() {
    return useContext(ImageViewContext);
}

export function ImageViewContextProvider({children}: { children: React.ReactNode }) {
    const [path, setPath] = useState<string | undefined>(undefined);

    return (
        <ImageViewContext.Provider value={{path, setPath}}>
            {children}
        </ImageViewContext.Provider>
    )
}