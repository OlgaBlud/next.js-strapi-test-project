// import { HeroSection } from "@/src/components/blocks/HeroSection";
// import { InfoBlock } from "@/src/components/blocks/InfoBlock";
import { BlockRenderer } from "@/src/components/common/BlockRenderer";
import { BlogCard } from "@/src/components/common/BlogCard";

import { ContentList } from "@/src/components/common/ContentList";
import { getHomePageData } from "@/src/data/loaders";
import { notFound } from "next/navigation";

async function loader() {
  const data = await getHomePageData();
  if (!data) notFound();
  // console.log("🎾🏓");
  return { ...data };
}

export default async function HomeRoute() {
  const { data } = await loader();
  const blocks = data?.blocks || [];
  // console.log(data);
  return (
    <div>
      {/* <HeroSection {...blocks[0]} />
      <InfoBlock {...blocks[1]} />
      <InfoBlock {...blocks[2]} /> */}
      <BlockRenderer blocks={blocks} />
      <div className="container">
        <ContentList
          headline="Featured Articles"
          path="/api/articles"
          component={BlogCard}
          featured
        />
      </div>
    </div>
  );
}
