import { ecliptic, azimuth, initContractsPartial } from "azimuth-js";
import Web3 from "web3";
import { PROVIDER_URL } from "../constants";
import { CONTRACT } from "../constants/contracts";
import * as ob from "urbit-ob";

// Using patp instead of point number for parameters since that's what L2 uses, then convert using ob.patp2dec

const azimuthConnection = async () => {
  const provider = new Web3.providers.HttpProvider(PROVIDER_URL);
  const web3 = new Web3(provider);
  const contracts = await initContractsPartial(web3, CONTRACT.azimuth);
  return contracts;
};

// Read txns
export const getPoints = async (walletAddress: string) => {
  const contracts = await azimuthConnection();
  const points = await azimuth.getOwnedPoints(contracts, walletAddress);
  return points;
};

export const getPoint = async (patp: string) => {
  const id = ob.patp2dec(patp);
  const contracts = await azimuthConnection();
  const point = await azimuth.getPoint(contracts, id);
  return point;
};

export const getShip = async (patp: string) => {
  const _ship = await getPoint(patp);
  const point = ob.patp2dec(patp);

  const ship = {
    patp: patp,
    point: point,
    layer: "l1",
    owner: _ship.owner,
    keyRevisionNumber: Number(_ship.keyRevisionNumber),
    hasSponsor: _ship.sponsor ? true : false, // zod issue?
    sponsor: _ship.sponsor ? Number(_ship.sponsor) : null,
    spawnProxy: _ship.spawnProxy,
    managementProxy: _ship.managementProxy,
    transferProxy: _ship.transferProxy,
    votingProxy: _ship.votingProxy,
  };

  return ship;
};

// Write txns
export const transferPoint = async (
  walletAddress: string,
  patp: string,
  from: string,
  to: string
) => {
  const point = ob.patp2dec(patp);
  const contracts = await azimuthConnection();
  const txParams = ecliptic.transferPoint(contracts, point, to, true);

  txParams.from = from;
  txParams.gasLimit = Web3.utils.toHex(150000);
  // txParams.maxPriorityFeePerGas = "0x3b9aca00";
  // txParams.maxFeePerGas = "0x2540be400";

  window.ethereum
    .request({
      method: "eth_sendTransaction",
      params: [txParams],
    })
    .then((txHash) => {
      return txHash;
    });
};

// Write txns
export const setManagementProxy = async (
  walletAddress: string,
  patp: string,
  from: string,
  managerAddress: string
) => {
  const point = ob.patp2dec(patp);
  const contracts = await azimuthConnection();
  const txParams = ecliptic.setManagementProxy(
    contracts,
    point,
    managerAddress
  );

  txParams.from = from;
  txParams.gasLimit = Web3.utils.toHex(150000); // change this to accurate value
  // txParams.maxPriorityFeePerGas = "0x3b9aca00";
  // txParams.maxFeePerGas = "0x2540be400";

  window.ethereum
    .request({
      method: "eth_sendTransaction",
      params: [txParams],
    })
    .then((txHash) => {
      return txHash;
    });
};
