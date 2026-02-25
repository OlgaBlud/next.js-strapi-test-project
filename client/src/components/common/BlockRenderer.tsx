import { Block } from "@/src/types";
import { HeroSection } from "../blocks/HeroSection";
import { InfoBlock } from "../blocks/InfoBlock";
import { FeaturedArticle } from "../blocks/FeaturedArcticle";
import { Subscribe } from "../blocks/Subscribe";
import { Heading } from "../blocks/Heading";
import { Paragraph } from "../blocks/Paragraph";
import { FullImage } from "../blocks/FullImage";
import { ParagraphWithImage } from "../blocks/ParagraphWithImage";

function blockRenderer(block: Block, index: number) {
  switch (block.__component) {
    case "blocks.hero-section":
      return <HeroSection {...block} key={index} />;
    case "blocks.info-block":
      return <InfoBlock {...block} key={index} />;
    case "blocks.featured-article":
      return <FeaturedArticle {...block} key={index} />;
    case "blocks.subscribe":
      return <Subscribe {...block} key={index} />;
    case "blocks.heading":
      return <Heading {...block} key={index} />;
    case "blocks.paragraph":
      return <Paragraph {...block} key={index} />;
    case "blocks.full-image":
      return <FullImage {...block} key={index} />;
    case "blocks.paragraph-with-image":
      return <ParagraphWithImage {...block} key={index} />;
    default:
      return null;
  }
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return blocks.map((block, index) => blockRenderer(block, index));
}
