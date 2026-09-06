import { parseRichText } from "@/lib/rich-text";
import { Fragment } from "react";

type Props = {
  /** Text with optional `**bold**` markers. */
  text: string;
};

/**
 * Renders a data-file string, turning `**bold**` markers into `<strong>`.
 */
export default function RichText({ text }: Props) {
  return parseRichText(text).map((segment, index) =>
    segment.bold ? (
      <strong key={index}>{segment.text}</strong>
    ) : (
      <Fragment key={index}>{segment.text}</Fragment>
    ),
  );
}
