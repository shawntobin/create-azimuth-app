import { ecliptic, azimuth, initContractsPartial } from "azimuth-js";
import Web3, { Bytes } from "web3";
import { LOGIN_METHODS, PROVIDER_URL } from "../constants";
import { CONTRACT } from "../constants/contracts";
import * as ob from "urbit-ob";
import { isGalaxy, hexify } from "./helper";

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
    hasSponsor: !isGalaxy(patp),
    sponsor: !isGalaxy(patp) ? Number(_ship.sponsor) : null,
    spawnProxy: _ship.spawnProxy,
    managementProxy: _ship.managementProxy,
    transferProxy: _ship.transferProxy,
    votingProxy: _ship.votingProxy,
    escapeRequested: _ship?.escapeRequested,
    escapeRequestedTo: _ship?.escapeRequestedTo.toString(),
  };

  return ship;
};
