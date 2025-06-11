"use client";

import {
  SandpackCodeEditor,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";

import { ComponentProps } from "react";

type Props = ComponentProps<typeof SandpackProvider>;

export default function CodePlayground({ ...props }: Props) {
  return (
    <SandpackProvider {...props}>
      <div className="space-y-5">
        <SandpackCodeEditor />
        <SandpackPreview />
      </div>
    </SandpackProvider>
  );
}
