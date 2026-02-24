import { FeaturedArticleProps } from "@/src/types";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { StrapiImage } from "../common/StrapiImage";

export function FeaturedArticle({
  title,
  link,
  excerpt,
  image,
}: Readonly<FeaturedArticleProps>) {
  console.log(image);
  return (
    <article className="featured-article container">
      <div className="featured-article__info">
        <h3>{title}</h3>
        <div className="copy">
          <ReactMarkdown>{excerpt}</ReactMarkdown>
        </div>
        <Link href={link.href} className="btn btn--turquoise btn--medium">
          {link.text}
        </Link>
      </div>
      <StrapiImage
        src={image.url}
        alt={image.alternativeText || "No alternative text provided"}
        height={200}
        width={300}
        unoptimized
      />
    </article>
  );
}
