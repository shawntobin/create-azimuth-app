import { NETWORK_EVENTS_API } from "../constants/config";

export const getEvents = async (ship) => {
  const apiUrl = `${NETWORK_EVENTS_API}/get_network_feed/${ship}`;

  const response = await fetch(apiUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};
