const INFURA_ID = import.meta.env.VITE_REACT_APP_INFURA_API;
export const NETWORK = import.meta.env.VITE_REACT_APP_NETWORK;

export const NETWORK_EVENTS_API = "";

// refactor
export const ROLLER_URL =
  NETWORK === "local"
    ? "http://localhost:80/v1/roller"
    : "https://roller.urbit.org:443/v1/roller";

export const PROVIDER_URL =
  NETWORK === "local"
    ? "http://localhost:8545"
    : `https://${NETWORK}.infura.io/v3/${INFURA_ID}`;
