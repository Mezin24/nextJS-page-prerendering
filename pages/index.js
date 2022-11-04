import { useEffect, useState } from 'react';
import { getFeaturedEvents } from '../helpers/api-utils';
import EventList from '../components/events/event-list';

function HomePage(props) {
  const [featuredEvents, setFeaturedEvents] = useState(props.featuredEvents);
  useEffect(() => {
    getFeaturedEvents().then((events) => setFeaturedEvents(events));
  }, []);

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
  };
};

export default HomePage;
