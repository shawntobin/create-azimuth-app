import * as L1 from "./transactionL1";
import * as L2 from "./transactionL2";
import { NETWORK, ETHEREUM_NETWORK } from "../constants";
import { getShipStatus } from "../lib/networkEvents";
import * as ob from "urbit-ob";

const layer = NETWORK === ETHEREUM_NETWORK.SEPOLIA ? L1 : L1;

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
  const shipWithStatus = {
    ...(ship as object),
    online: shipStatus?.online,
  };
  return shipWithStatus;
};

export const getSpawned = async (patp: string) => {
  const children = await layer.getSpawned(patp);
  return children;
};

export const getSpawnCount = async (patp: string) => {
  const children = await layer.getSpawnCount(patp);
  return children;
};

// WRITE transactions

export const transferPoint = async (
  walletType: symbol,
  patp: string,
  from: string,
  to: string,
  wallet: UrbitWallet,
  gasSelection: any,
  onTransactionComplete: (receipt: any) => void
) => {
  return await layer.transferPoint(
    walletType,
    patp,
    from,
    to,
    wallet,
    gasSelection,
    onTransactionComplete
  );
};

export const changeManagementProxy = async (
  walletType: symbol,
  patp: string,
  from: string,
  managerAddress: string,
  wallet: UrbitWallet,
  gasSelection: any,
  onTransactionComplete: (receipt: any) => void
) => {
  return await layer.changeManagementProxy(
    walletType,
    patp,
    from,
    managerAddress,
    wallet,
    gasSelection,
    onTransactionComplete
  );
};

export const changeSpawnProxy = async (
  walletType: symbol,
  patp: string,
  from: string,
  spawnProxyAddress: string,
  wallet: UrbitWallet,
  gasSelection: any,
  onTransactionComplete: (receipt: any) => void
) => {
  return await layer.changeSpawnProxy(
    walletType,
    patp,
    from,
    spawnProxyAddress,
    wallet,
    gasSelection,
    onTransactionComplete
  );
};

export const requestNewSponsor = async (
  walletType: symbol,
  patp: string,
  from: string,
  newSponsorPatp: string,
  wallet: UrbitWallet,
  gasSelection: any,
  onTransactionComplete: (receipt: any) => void
) => {
  return await layer.requestNewSponsor(
    walletType,
    patp,
    from,
    newSponsorPatp,
    wallet,
    gasSelection,
    onTransactionComplete
  );
};

export const spawnPoint = async (
  walletType: symbol,
  patp: string,
  from: string,
  newSponsorPatp: string,
  wallet: UrbitWallet,
  // gasSelection: any,
  onTransactionComplete: (receipt: any) => void
) => {
  return await layer.spawnPoint(
    walletType,
    patp,
    from,
    newSponsorPatp,
    wallet,
    // gasSelection,
    onTransactionComplete
  );
};
