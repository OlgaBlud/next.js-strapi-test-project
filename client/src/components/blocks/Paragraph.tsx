import { ParagraphProps } from "@/src/types";
import React from "react";
import ReactMarkdown from "react-markdown";

export function Paragraph({ content }: Readonly<ParagraphProps>) {
  return (
    <div className="copy article-paragraph">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
