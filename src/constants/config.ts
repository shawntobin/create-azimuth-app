const INFURA_ID = import.meta.env.VITE_REACT_APP_INFURA_API;

export const NETWORK = import.meta.env.VITE_REACT_APP_NETWORK;

const isLocal = NETWORK === "local";

export const PROVIDER_URL = isLocal
  ? "http://127.0.0.1:8545"
  : `https://${NETWORK}.infura.io/v3/${INFURA_ID}`;
