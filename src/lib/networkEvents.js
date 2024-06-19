import { NETWORK_EVENTS_API } from "../constants/config";

export const getEvents = async (ship) => {
  const apiUrl = `${NETWORK_EVENTS_API}${ship}`;

  const response = await fetch(apiUrl, {
    headers: {},
  });

  return response.json();
};
