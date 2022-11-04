const getData = async (url) => {
  try {
    const response = await fetch(url);
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllEvents = async () => {
  return await getData('http://localhost:5000/events');
};

export const getFeaturedEvents = async () => {
  return await getData('http://localhost:5000/events?isFeatured=true');
};

export const getEventById = async (id) => {
  const [event] = await getData(`http://localhost:5000/events?id=${id}`);
  return event;
};

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
