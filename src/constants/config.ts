const INFURA_ID = process.env.REACT_APP_INFURA_API;
const NETWORK = process.env.REACT_APP_NETWORK;

// export const ROLLER_URL = "https://roller.urbit.org:443/v1/roller";
export const INFURA_URL = `https://${NETWORK}.infura.io/v3/${INFURA_ID}`;
