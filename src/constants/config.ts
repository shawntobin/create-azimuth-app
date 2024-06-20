const INFURA_ID = import.meta.env.VITE_REACT_APP_INFURA_API;
const INFURA_SECRET_KEY = import.meta.env.VITE_REACT_APP_INFURA_API_SECRET_KEY;
export const NETWORK = import.meta.env.VITE_REACT_APP_NETWORK;
export const INFURA_BASE64_AUTH = Buffer.from(
  INFURA_ID + ":" + INFURA_SECRET_KEY
).toString("base64");

export const INFURA_GAS_URL =
  "https://gas.api.infura.io/networks/1/suggestedGasFees";

export const NETWORK_EVENTS_API =
  "https://mt2aga2c5l.execute-api.us-east-2.amazonaws.com/get-pki-events?urbit-id=";

// refactor
export const ROLLER_URL =
  NETWORK === "local"
    ? "http://localhost:80/v1/roller"
    : "https://roller.urbit.org:443/v1/roller";

export const PROVIDER_URL =
  NETWORK === "local"
    ? "http://localhost:8545"
    : `https://${NETWORK}.infura.io/v3/${INFURA_ID}`;
