type SectionTitleProps = {
  className?: string;
  children: string;
};

export default function SectionTitle({
  className,
  children,
}: SectionTitleProps) {
  return <h2 className={`text-xl lg:px-5 ${className}`}>{children}</h2>;
}
