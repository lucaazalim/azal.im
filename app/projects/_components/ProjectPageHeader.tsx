import PageHeader from "@/app/_components/header/PageHeader";
import { Badge } from "@/app/_components/ui/badge";
import { ComponentProps } from "react";

export default function ProjectPageHeader({
  children,
  ...props
}: ComponentProps<typeof PageHeader>) {
  return (
    <PageHeader className="max-w-7xl border-dashed xl:border-x-2" {...props}>
      <Badge>Project</Badge>
      {children}
    </PageHeader>
  );
}
