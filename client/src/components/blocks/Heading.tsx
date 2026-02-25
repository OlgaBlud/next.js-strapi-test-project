import { HeadingProps } from "@/src/types";
import React from "react";

export function Heading({ title, linkId }: Readonly<HeadingProps>) {
  return (
    <h3 className="article-headline" id={linkId}>
      {title}
    </h3>
  );
}
