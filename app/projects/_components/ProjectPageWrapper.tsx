import PageWrapper from "@/app/_components/header/PageWrapper";
import { ComponentProps } from "react";

export default function ProjectPageWrapper({
  ...props
}: ComponentProps<typeof PageWrapper>) {
  return <PageWrapper className="space-y-0!" {...props} />;
}
