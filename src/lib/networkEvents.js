import { NETWORK_EVENTS_API, SHIP_STATUS_API } from "../constants/config";

export const getEvents = async (ship) => {
  const apiUrl = `${NETWORK_EVENTS_API}${ship}`;

  const response = await fetch(apiUrl, {
    headers: {},
  });

  return response.json();
};

export const getShipStatus = async (ship) => {
  // api should return date of last status sweep so we know if ship wasn't successfully pinged
  const apiUrl = `${SHIP_STATUS_API}${ship}`;

  const response = await fetch(apiUrl, {
    headers: {},
  });

  return response.json();
};
