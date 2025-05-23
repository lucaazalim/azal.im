type ContainerProps = {
  link?: string;
  children: React.ReactNode;
};

export default function ItemContainer({ link, children }: ContainerProps) {
  return (
    <div>
      <a href={link} target="_blank">
        <div
          className="
                    relative group/container
                    lg:hover:scale-[101%]
                    lg:hover:bg-white/5 lg:hover:bg-linear-to-br from-white/5 to-white/1
                    border-t lg:hover:border-t-white/20 lg:hover:border-b-black/50 border-transparent
                    lg:hover:opacity-100! lg:group-hover/section:opacity-50
                    rounded-lg lg:p-5 transition-all
                "
        >
          {children}
        </div>
      </a>
    </div>
  );
}
