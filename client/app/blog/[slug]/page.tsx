import { HeroSection } from "@/src/components/blocks/HeroSection";
import { BlockRenderer } from "@/src/components/common/BlockRenderer";
import { Card, CardProps } from "@/src/components/common/Card";
import { ContentList } from "@/src/components/common/ContentList";
import { getContentBySlug } from "@/src/data/loaders";
import { ArticleProps, Block } from "@/src/types";
import { formatDate } from "@/src/utils/formate-date";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function loader(slug: string) {
  const { data } = await getContentBySlug(slug, "/api/articles");
  const article = data[0];
  if (!article) throw notFound();
  return { article: article as ArticleProps, blocks: article?.blocks };
}

interface ArticleOverviewProps {
  title: string;
  description: string;
  tableOfContents?: { title: string; linkId?: string }[];
}

function ArticleOverview({
  title,
  description,
  tableOfContents,
}: Readonly<ArticleOverviewProps>) {
  return (
    <div className="article-overview">
      <div className="article-overview__info">
        <h3 className="article-overview__headline">{title}</h3>
        <p className="article-overview__description">{description}</p>
      </div>
      {tableOfContents && (
        <ul className="article-overview__contents">
          {tableOfContents.map((item, index) => (
            <li key={index}>
              <Link href={`#${item.linkId}`} className="article-overview__link">
                {index + 1}. {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
const BlogCard = (props: Readonly<CardProps>) => (
  <Card {...props} basePath="/blog" />
);
export default async function SingleBlogRoute({ params }: PageProps) {
  const slug = (await params).slug;
  const { article, blocks } = await loader(slug);
  const { title, author, publishedAt, description, image } = article;
  console.dir(blocks, { depth: null });
  const tableOfContents = blocks?.filter(
    (block: Block) => block.__component === "blocks.heading",
  );
  return (
    <div>
      <HeroSection
        id={article.id}
        title={title}
        theme="orange"
        image={image}
        author={author}
        publishedAt={formatDate(publishedAt)}
        darken={true}
      />
      <div className="container">
        <ArticleOverview
          title={title}
          description={description}
          tableOfContents={tableOfContents}
        />
        <BlockRenderer blocks={blocks} />
        <ContentList
          headline="More Articles"
          path="/api/articles"
          component={BlogCard}
          featured={true}
          headlineAlignment="center"
        />
      </div>
    </div>
  );
}
