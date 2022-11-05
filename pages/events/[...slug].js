import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { getFilteredEvents } from '../../helpers/api-utils';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import useSWR from 'swr';

function FilteredEventsPage() {
  const [events, setEvents] = useState();
  const router = useRouter();
  const {
    query: { slug },
  } = router;

  const [year, month] = slug;
  const numYear = +year;
  const numMonth = +month;

  const { data, error } = useSWR('http://localhost:5000/events', (url) =>
    fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    setEvents(data);
  }, [data]);

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (!events) {
    return <div className='center'>Loading...</div>;
  }
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

// export const getServerSideProps = async (ctx) => {
//   const {
//     params: { slug: filterData },
//   } = ctx;

//   const [filteredYear, filteredMonth] = filterData;

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//     };
//   }

//   return {
//     props: {
//       filteredEvents,
//       date: { year: numYear, month: numMonth },
//     },
//   };
// };

export default FilteredEventsPage;
