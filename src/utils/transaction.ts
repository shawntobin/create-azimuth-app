import * as L1 from "./transactionL1";
import * as L2 from "./transactionL2";
import { NETWORK, ETHEREUM_NETWORK } from "../constants";
import { getShipStatus } from "../lib/networkEvents";

const layer = NETWORK === ETHEREUM_NETWORK.SEPOLIA ? L1 : L2;

// transaction "routing" to either L1 or L2

// READ transactions

export const getPoints = async (walletAddress: string) => {
  console.log("network", NETWORK);

  const points = await layer.getPoints(walletAddress);

  // for now, convert from bigInt to number
  return points.map((point) => Number(point));
};

export const getPoint = async (walletAddress: string) => {
  const point = await layer.getPoint(walletAddress);
  return point;
};

// online status to be made optional param ?
export const getShip = async (patp: string) => {
  const ship = await layer.getShip(patp);

  const shipStatus = await getShipStatus(patp);
  const shipWithStatus = { ...ship, online: shipStatus?.online };
  return shipWithStatus;
};

// WRITE transactions

export const transferPoint = async (
  walletAddress: string,
  patp: string,
  from: string,
  to: string,
  onTransactionComplete: (receipt: any) => void
) => {
  return await layer.transferPoint(
    walletAddress,
    patp,
    from,
    to,
    onTransactionComplete
  );
};

export const changeManagementProxy = async (
  walletAddress: string,
  patp: string,
  from: string,
  managerAddress: string,
  onTransactionComplete: (receipt: any) => void
) => {
  return await layer.changeManagementProxy(
    walletAddress,
    patp,
    from,
    managerAddress,
    onTransactionComplete
  );
};

export const requestNewSponsor = async (
  walletAddress: string,
  patp: string,
  from: string,
  newSponsorPatp: string,
  onTransactionComplete: (receipt: any) => void
) => {
  return await layer.requestNewSponsor(
    walletAddress,
    patp,
    from,
    newSponsorPatp,
    onTransactionComplete
  );
};
