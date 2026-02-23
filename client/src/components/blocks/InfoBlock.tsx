import Link from "next/link";
import ReactMarkdown from "react-markdown";

import { StrapiImage } from "../common/StrapiImage";
import { InfoBlockProps } from "@/src/types";

export function InfoBlock({
  theme,
  isReversed,
  image,
  title,
  content,
  cta,
}: Readonly<InfoBlockProps>) {
  return (
    <section
      className={`info info--${theme} ${isReversed && "info--reversed"}`}
    >
      <StrapiImage
        src={image.url}
        alt={image.alternativeText || "No alternative text provided"}
        height={500}
        width={600}
        unoptimized
        className="info__image"
      />
      <div className="info__text">
        <h2 className={`info__headline info__headline--${theme}`}>{title}</h2>
        <div className="copy">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        {/* <ReactMarkdown className="copy">{content}</ReactMarkdown> */}
        {cta && (
          <Link
            href={cta.href ? cta.href : "#"}
            target={cta.isExternal ? "_blank" : "_self"}
          >
            <button className={`btn btn--medium btn--${theme}`}>
              {cta.text}
            </button>
          </Link>
        )}
      </div>
    </section>
  );
}
