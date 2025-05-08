type SectionTitleProps = {
  className?: string;
  children: string;
};

export default function SectionTitle({
  className,
  children,
}: SectionTitleProps) {
  return <h2 className={`lg:px-5 text-xl ${className}`}>{children}</h2>;
}
