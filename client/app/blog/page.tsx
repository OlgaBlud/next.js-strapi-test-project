import { BlockRenderer } from "@/src/components/common/BlockRenderer";
import { Card, CardProps } from "@/src/components/common/Card";
import { ContentList } from "@/src/components/common/ContentList";
import { getPageBySlug } from "@/src/data/loaders";
import { notFound } from "next/navigation";

async function loader(slug: string) {
  const { data } = await getPageBySlug("blog");
  if (data.length === 0) notFound();
  return { blocks: data[0]?.blocks };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}
const BlogCard = (props: Readonly<CardProps>) => (
  <Card {...props} basePath="blog" />
);

export default async function BlogRoute({ params }: PageProps) {
  const slug = (await params).slug;
  const { blocks } = await loader(slug);
  return (
    <div className="blog-page">
      <BlockRenderer blocks={blocks} />
      <ContentList
        headline="Check out our latest articles"
        path="/api/articles"
        component={BlogCard}
      />
    </div>
  );
}
