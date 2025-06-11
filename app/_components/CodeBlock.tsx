import { BundledLanguage, codeToHtml } from "shiki";

interface Props {
  code: string;
  lang: BundledLanguage;
}

export async function CodeBlock({ code, lang }: Props) {
  const out = await codeToHtml(code, {
    lang: lang,
    theme: "github-dark",
  });

  return <div className="prose" dangerouslySetInnerHTML={{ __html: out }} />;
}
