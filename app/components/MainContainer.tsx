import {ReactNode} from "react";

export default function MainContainer({children}: {children: ReactNode}) {
    return (
        <main className="py-24 space-y-24">
            {children}
        </main>
    );
}