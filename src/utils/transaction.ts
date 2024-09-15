import * as L1 from "./transactionL1";
import { NETWORK, ETHEREUM_NETWORK } from "../constants";

const layer = L1;

// READ transactions

export const getPoints = async (walletAddress: string) => {
  console.log("network", NETWORK);

  const points = await layer.getPoints(walletAddress);

  return points.map((point) => Number(point));
};

export const getPoint = async (walletAddress: string) => {
  const point = await layer.getPoint(walletAddress);
  return point;
};

export const getShip = async (patp: string) => {
  const ship = await layer.getShip(patp);

  return ship;
};
