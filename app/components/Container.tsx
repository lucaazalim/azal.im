type ContainerProps = {
    link?: string;
    children: React.ReactNode
}

export default function Container({link, children}: ContainerProps) {

    return (
        <div>
            <a href={link} target='_blank'>
                <div className="
            hover:scale-[101%]
            hover:bg-white/5 hover:bg-gradient-to-br from-white/10 to-white/1
            rounded-lg p-5 transition-all
            border-t-[1px] hover:border-t-white/20 hover:border-b-black/50 border-transparent">
                    {children}
                </div>
            </a>
        </div>
    );

}