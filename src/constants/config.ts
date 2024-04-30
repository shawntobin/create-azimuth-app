const INFURA_ID = import.meta.env.VITE_REACT_APP_INFURA_API;

export const NETWORK = import.meta.env.VITE_REACT_APP_NETWORK;
export const ROLLER_URL = "https://roller.urbit.org:443/v1/roller"; //"http://localhost:8080/v1/roller";
export const PROVIDER_URL =
  NETWORK === "local"
    ? "http://localhost:8545"
    : `https://${NETWORK}.infura.io/v3/${INFURA_ID}`;
