import { CodeBlock } from "@/app/_components/CodeBlock";
import { ReactNode } from "react";

type Props = {
  code: string;
  children?: ReactNode;
};

export default function TailwindShowcase({ code, children }: Props) {
  return (
    <div className="grid grid-cols-2 gap-5">
      <CodeBlock code={code} lang="html" />
      <div>{children}</div>
    </div>
  );
}
