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
