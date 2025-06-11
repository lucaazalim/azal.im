import CodePlayground from "./CodePlayground";

import { nightOwl } from "@codesandbox/sandpack-themes";
import { readFileSync } from "fs";
import path from "path";
import prettier from "prettier";
import { fileURLToPath } from "url";

type Props = {
  code: string;
};

export default async function TailwindPlayground({ code }: Props) {
  // Get __dirname equivalent in ES Modules
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Read the file relative to the current file
  const filePath = path.join(__dirname, "./assets/styles.css");
  const cssText = readFileSync(filePath, "utf-8");

  let formattedCode = await prettier.format(
    `export default function Example() {return (${code});}`,
    {
      parser: "babel",
      semi: true,
      singleQuote: true,
    },
  );

  formattedCode = formattedCode.slice(0, -1);

  return (
    <CodePlayground
      theme={nightOwl}
      template="react"
      options={{
        externalResources: ["https://cdn.tailwindcss.com"],
      }}
      files={{
        "/App.js": formattedCode,
        "styles.css": {
          code: cssText,
          hidden: true,
          readOnly: true,
        },
      }}
    />
  );
}
