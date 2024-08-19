import {ArrowLeft, ArrowUpRight} from "lucide-react";

type ContainerProps = {
    link?: string;
    children: React.ReactNode
}

export default function ItemContainer({link, children}: ContainerProps) {

    return (
        <div>
            <a href={link} target='_blank'>
                <div className="
                    relative group
                    lg:hover:scale-[101%]
                    lg:hover:bg-white/5 lg:hover:bg-gradient-to-br from-white/10 to-white/1
                    rounded-lg lg:p-5 transition-all
                    border-t-[1px] lg:hover:border-t-white/20 lg:hover:border-b-black/50 border-transparent
                ">
                    {children}
                </div>
            </a>
        </div>
    );

}