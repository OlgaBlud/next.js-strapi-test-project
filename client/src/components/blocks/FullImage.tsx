import { FullImageProps } from "@/src/types";
import { StrapiImage } from "../common/StrapiImage";

export function FullImage({ image }: Readonly<FullImageProps>) {
  // console.log("🎾🎾🎾🎾🎾🎾🎾", image.url);
  return (
    <div className="article-image">
      <StrapiImage
        src={image.url}
        alt={image.alternativeText || "No alternative text provided"}
        width={1920}
        height={1080}
        className="article-image__image"
        unoptimized
      />
    </div>
  );
}
