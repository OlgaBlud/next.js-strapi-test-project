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
}

const EventCard = (props: Readonly<CardProps>) => (
  <Card {...props} basePath="events" />
);

export default async function SingleEventRoute({ params }: ParamsProps) {
  const slug = (await params).slug;
  const { event, blocks } = await loader(slug);

  return (
    <div className="container">
      <div className="event-page">
        <EventSignupForm
          blocks={blocks}
          eventId={event.documentId}
          startDate={event.startDate}
          price={event.price}
          image={{
            url: event?.image?.url,
            alt: event?.image?.alternativeText || "Event image",
          }}
        />
      </div>
      <ContentList
        headline="Featured Events"
        path="/api/events"
        component={EventCard}
        featured={true}
      />
    </div>
  );
}
