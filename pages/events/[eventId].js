import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import {
  getEventById,
  getAllEvents,
  getFeaturedEvents,
} from '../../helpers/api-utils';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

function EventDetailPage(props) {
  const { event } = props;

  if (!event) {
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
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
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const paths = events.map((item) => ({ params: { eventId: item.id } }));

  return {
    paths,
    fallback: true,
  };
};

export default EventDetailPage;
