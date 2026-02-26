import { BlockRenderer } from "@/src/components/common/BlockRenderer";
import { BlogCard } from "@/src/components/common/BlogCard";

import { ContentList } from "@/src/components/common/ContentList";
import { getPageBySlug } from "@/src/data/loaders";
import { notFound } from "next/navigation";

async function loader(slug: string) {
  const { data } = await getPageBySlug(slug);
  if (data.length === 0) notFound();
  // console.log("🪀🥏🏐data", data);
  return { blocks: data[0]?.blocks };
}

interface PageProps {
  searchParams: Promise<{ page?: string; query?: string }>;
}

export default async function BlogRoute({ searchParams }: PageProps) {
  const { page, query } = await searchParams;
  // const slug = (await params).slug;
  const { blocks } = await loader("blog");
  return (
    <div className="blog-page">
      <BlockRenderer blocks={blocks} />
      <ContentList
        headline="Check out our latest articles"
        path="/api/articles"
        component={BlogCard}
        showSearch
        query={query}
        showPagination
        page={page}
      />
    </div>
  );
}
