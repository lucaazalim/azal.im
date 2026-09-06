export type RichTextSegment = {
  text: string;
  bold: boolean;
};

const BOLD_PATTERN = /\*\*([^*]+)\*\*/g;

/**
 * Splits a string with `**bold**` markers into plain/bold segments. This is
 * the only inline formatting supported by the hand-written data files, so a
 * tiny parser beats pulling in a Markdown renderer.
 */
export function parseRichText(text: string): RichTextSegment[] {
  const segments: RichTextSegment[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(BOLD_PATTERN)) {
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index), bold: false });
    }

    segments.push({ text: match[1], bold: true });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), bold: false });
  }

  return segments;
}

/**
 * Strips `**bold**` markers, returning plain text (for metadata and
 * structured data where markup is not wanted).
 */
export function toPlainText(text: string): string {
  return parseRichText(text)
    .map((segment) => segment.text)
    .join("");
}
