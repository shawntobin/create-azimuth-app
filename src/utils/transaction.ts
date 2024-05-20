import * as L1 from "./transactionL1";
import * as L2 from "./transactionL2";
import { NETWORK, ETHEREUM_NETWORK } from "../constants";

const layer = NETWORK === ETHEREUM_NETWORK.SEPOLIA ? L1 : L2;

// READ transactions

export const getPoints = async (walletAddress: string) => {
  const points = await layer.getPoints(walletAddress);

  // for now, convert from bigInt to number
  return points.map((point) => Number(point));
};

export const getPoint = async (walletAddress: string) => {
  const point = await layer.getPoint(walletAddress);
  return point;
};

export const getShip = async (patp: string) => {
  return await layer.getShip(patp);
};

// WRITE transactions

export const transferPoint = async (
  walletAddress: string,
  patp: string,
  from: string,
  to: string
) => {
  return await layer.transferPoint(walletAddress, patp, from, to);
};

export const changeManagementProxy = async (
  walletAddress: string,
  patp: string,
  from: string,
  managerAddress: string
) => {
  return await layer.changeManagementProxy(
    walletAddress,
    patp,
    from,
    managerAddress
  );
};

export const requestNewSponsor = async (
  walletAddress: string,
  patp: string,
  from: string,
  newSponsorPatp: string
) => {
  return await layer.requestNewSponsor(
    walletAddress,
    patp,
    from,
    newSponsorPatp
  );
};
