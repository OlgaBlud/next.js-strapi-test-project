export interface LinkProps {
  id: number;
  text: string;
  href: string;
  isExternal: boolean;
}

export interface ImageProps {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string;
}

export interface LogoProps {
  logoText: string;
  image: ImageProps;
}

type ComponentType =
  | "blocks.hero-section"
  | "blocks.info-block"
  | "blocks.featured-article"
  | "blocks.subscribe"
  | "blocks.heading"
  | "blocks.paragraph-with-image"
  | "blocks.paragraph"
  | "blocks.full-image";

interface Base<
  T extends ComponentType,
  D extends object = Record<string, unknown>,
> {
  id: number;
  __component?: T;
  documentId?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  data?: D;
}

export type Block =
  | HeroSectionProps
  | InfoBlockProps
  | FeaturedArticleProps
  | SubscribeProps
  | HeadingProps
  | ParagraphWithImageProps
  | ParagraphProps
  | FullImageProps;

export interface HeroSectionProps extends Base<"blocks.hero-section"> {
  theme: "turquoise" | "orange";
  title: string;
  image: ImageProps;
  cta?: LinkProps;
  logo?: LogoProps;
  author?: string;
  darken?: boolean;
}

export interface InfoBlockProps extends Base<"blocks.info-block"> {
  theme: "turquoise" | "orange";
  isReversed?: boolean;
  title: string;
  content: string;
  image: ImageProps;
  cta?: LinkProps;
}
export interface FeaturedArticleProps extends Base<"blocks.featured-article"> {
  title: string;
  excerpt: string;
  link: LinkProps;
  image: ImageProps;
}
export interface SubscribeProps extends Base<"blocks.subscribe"> {
  title: string;
  content: string;
  placeholder: string;
  buttonText: string;
}

export type FormStateType = {
  zodErrors: {
    email?: {
      errors: string[];
    };
  } | null;
  strapiErrors: {
    message?: string;
  } | null;
  errorMessage: string | null;
  successMessage: string | null;
};
export interface ArticleProps {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  image: ImageProps;
  author: string;
  featured: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface HeadingProps extends Base<"blocks.heading"> {
  title: string;
  linkId?: string;
}

export interface ParagraphWithImageProps extends Base<"blocks.paragraph-with-image"> {
  content: string;
  image: ImageProps;
  isReversed?: boolean;
  imageLandscape?: boolean;
}

export interface ParagraphProps extends Base<"blocks.paragraph"> {
  content: string;
}

export interface FullImageProps extends Base<"blocks.full-image"> {
  id: number;
  __component: "blocks.full-image";
  image: ImageProps;
}
