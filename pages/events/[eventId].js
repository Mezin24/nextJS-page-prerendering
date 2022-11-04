import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { getEventById, getAllEvents } from '../../helpers/api-utils';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

function EventDetailPage(props) {
  const [event, setEvent] = useState(props.event);
  const router = useRouter();

  const { eventId } = router.query;
  // const event = getEventById(eventId);
  useEffect(() => {
    getEventById(eventId).then((data) => setEvent(data));
  }, []);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

export const getStaticProps = async (ctx) => {
  const {
    params: { eventId },
  } = ctx;
  const event = await getEventById(eventId);
  console.log(event);

  return {
    props: {
      event,
    },
  };
};

export const getStaticPaths = async () => {
  const events = await getAllEvents();
  const paths = events.map((item) => ({ params: { eventId: item.id } }));

  return {
    paths,
    fallback: false,
  };
};

export default EventDetailPage;
