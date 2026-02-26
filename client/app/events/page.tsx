import { Card, CardProps } from "@/src/components/common/Card";
import { ContentList } from "@/src/components/common/ContentList";
import { EventSignupForm } from "@/src/components/common/EventSignupForm";
import { getContentBySlug } from "@/src/data/loaders";
import { EventProps } from "@/src/types";
import { notFound } from "next/navigation";

async function loader(slug: string) {
  const { data } = await getContentBySlug(slug, "/api/events");
  const event = data[0];
  if (!event) throw notFound();
  return { event: event as EventProps, blocks: event?.blocks };
}

interface ParamsProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; query?: string }>;
}

const EventCard = (props: Readonly<CardProps>) => (
  <Card {...props} basePath="events" />
);

export default async function AllEventsRoute({
  params,
  searchParams,
}: ParamsProps) {
  const slug = (await params).slug;
  //   console.log("💠💠💠 slug", slug);
  const { query, page } = await searchParams;
  const { event, blocks } = await loader(slug);
  //   console.log(" ✅blocks", blocks);
  return (
    <div className="container">
      <div className="event-page">
        <EventSignupForm blocks={blocks} eventId={event.documentId} />
      </div>
      <ContentList
        headline="All Events"
        path="/api/events"
        query={query}
        page={page}
        showSearch
        showPagination
        component={EventCard}
      />
    </div>
  );
}
