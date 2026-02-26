import { getContent } from "@/src/data/loaders";
import { ArticleProps } from "@/src/types";
import { Search } from "./Search";
import { Pagination } from "./Pagination";

interface ContentListProps {
  headline: string;
  query?: string;
  path: string;
  featured?: boolean;
  component: React.ComponentType<ArticleProps & { basePath: string }>;
  headlineAlignment?: "center" | "right" | "left";
  showSearch?: boolean;
  page?: string;
  showPagination?: boolean;
}

async function loader(
  path: string,
  featured?: boolean,
  query?: string,
  page?: string,
) {
  const { data, meta } = await getContent(path, featured, query, page);
  // console.log("FULL DATA:", data);
  return {
    articles: (data as ArticleProps[]) || [],
    pageCount: meta?.pagination?.pageCount || 1,
  };
}

export async function ContentList({
  headline,
  path,
  featured,
  component,
  headlineAlignment = "left",
  showSearch,
  query,
  showPagination,
  page,
}: Readonly<ContentListProps>) {
  const { articles, pageCount } = await loader(path, featured, query, page);
  const Component = component;

  return (
    <section className="content-items container">
      <h3
        className={`content-items__headline ${`content-items--${headlineAlignment}`}`}
      >
        {headline || "Featured Articles"}
      </h3>
      {showSearch && <Search />}
      <div className="content-items__container--card">
        {articles.map((article) => (
          <Component key={article.documentId} {...article} basePath={path} />
        ))}
      </div>
      {showPagination && <Pagination pageCount={pageCount} />}
    </section>
  );
}
