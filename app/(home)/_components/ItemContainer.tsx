type ContainerProps = {
  link?: string;
  children: React.ReactNode;
};

export default function ItemContainer({ link, children }: ContainerProps) {
  return (
    <div>
      <a href={link} target="_blank">
        <div className="group/container relative border-t border-transparent from-white/5 to-white/1 transition-all lg:p-5 lg:group-hover/section:opacity-50 lg:hover:scale-[101%] lg:hover:border-t-white/20 lg:hover:border-b-black/50 lg:hover:bg-white/5 lg:hover:bg-linear-to-br lg:hover:opacity-100!">
          {children}
        </div>
      </a>
    </div>
  );
}
