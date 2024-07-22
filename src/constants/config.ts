import { Options } from "@urbit/roller-api";

const INFURA_ID = import.meta.env.VITE_REACT_APP_INFURA_API;
const INFURA_SECRET_KEY = import.meta.env.VITE_REACT_APP_INFURA_API_SECRET_KEY;

export const NETWORK = import.meta.env.VITE_REACT_APP_NETWORK;

const isLocal = NETWORK === "local";

export const INFURA_BASE64_AUTH = Buffer.from(
  INFURA_ID + ":" + INFURA_SECRET_KEY
).toString("base64");

export const INFURA_GAS_URL =
  "https://gas.api.infura.io/networks/1/suggestedGasFees";

export const NETWORK_EVENTS_API =
  "https://mt2aga2c5l.execute-api.us-east-2.amazonaws.com/get-pki-events?urbit-id=";

export const SHIP_STATUS_API =
  "https://mt2aga2c5l.execute-api.us-east-2.amazonaws.com/get-node?urbit-id=";

export const ROLLER_URL = isLocal
  ? "http://localhost:8080/v1/roller" // ensure port is same as local roller
  : "https://roller.urbit.org:443/v1/roller";

export const PROVIDER_URL = isLocal
  ? "http://localhost:8545"
  : `https://${NETWORK}.infura.io/v3/${INFURA_ID}`;

export const ROLLER_OPTIONS: Options = {
  transport: {
    type: isLocal ? "http" : "https",
    host: isLocal ? "localhost" : "roller.urbit.org",
    port: isLocal ? 8080 : 443,
    path: "/v1/roller",
  },
};
