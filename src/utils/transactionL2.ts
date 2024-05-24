import { useMemo } from "react";
import * as c from "../constants/config";
import { ROLLER_URL } from "../constants/config";
import { generateHashAndSign } from "../lib/roller";
import {
  RollerRPCAPI,
  Proxy,
  Signature,
  From,
  EthAddress,
  AddressParams,
  Ship,
  SpawnParams,
  L2Data,
  PendingTransaction,
  Options,
} from "@urbit/roller-api";
import * as ob from "urbit-ob";

// Roller options
const options: Options = {
  transport: {
    type: "https", //http
    host: "roller.urbit.org", // localhost
    port: 443,
    path: "/v1/roller",
  },
};

// L2 Opcodes

// 00: transfer-point
// 01: spawn
// 02: configure-keys
// 03: escape
// 04: cancel-escape
// 05: adopt
// 06: reject
// 07: detach
// 08: set-management-proxy
// 09: set-spawn-proxy
// 10: set-transfer-proxy

// type: "websocket" | "http" | "https" | "postmessagewindow" | "postmessageiframe";
// host: string;
// port: number;
// path?: string;
// protocol?: string;

// read transactions

const callRoller = async (method: string, params: any) => {
  const requestId = Date.now().toString();

  try {
    const rawResponse = await fetch(ROLLER_URL, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "text/plain",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: requestId,
        method: method,
        params: params,
      }),
    });

    const res = await rawResponse.json();
    return res;
  } catch (error) {
    console.error("Error calling the roller:", error);
    throw error;
  }
};

export const getPoints = async (addr: string) => {
  // Note - may need to also check L1

  const res = await callRoller("getOwnedPoints", { address: addr });
  const allPoints = res.result;

  return allPoints;
};

export const getShip = async (patp: string) => {
  const _ship = await getPoint(patp);
  const id = ob.patp2dec(patp);

  const ship: Ship = {
    patp: patp,
    point: id,
    layer: _ship.dominion,
    owner: _ship.ownership.owner.address,
    keyRevisionNumber: _ship.network.keys.life,
    hasSponsor: _ship.network.sponsor.has,
    sponsor: _ship.network.sponsor.who,
    spawnProxy: _ship.ownership.spawnProxy.address,
    managementProxy: _ship.ownership.managementProxy.address,
    transferProxy: _ship.ownership.transferProxy.address,
    votingProxy: _ship.ownership.votingProxy.address,
  };

  return ship;
};

export const getPoint = async (patp: string) => {
  const res = await callRoller("getPoint", { ship: patp });

  return res.result;
};

// Write transactions

export const transferPoint = async (
  walletAddress: string,
  patp: string,
  from: string,
  to: string
) => {
  const api = new RollerRPCAPI(options);
  const nonce = await api.getNonce({ ship: patp, proxy: "own" });

  const signedMessage = await generateHashAndSign(
    api,
    {},
    walletAddress,
    nonce,
    {
      ship: patp,
      proxy: "own",
    },
    "transferPoint",
    {
      address: to,
      reset: false,
    }
  );

  const params = {
    address: from,
    sig: signedMessage,
    from: {
      ship: patp,
      proxy: "own",
    },
    data: {
      address: to,
      reset: false,
    },
  };

  const res = await callRoller("transferPoint", params);

  return res;
};

export const changeManagementProxy = async (
  walletAddress: string,
  patp: string,
  from: string,
  managerAddress: string
) => {
  const api = new RollerRPCAPI(options);
  const nonce = await api.getNonce({ ship: patp, proxy: "own" });
  const signedMessage = await generateHashAndSign(
    api,
    {},
    walletAddress,
    nonce,
    {
      ship: patp,
      proxy: "own",
    },
    "setManagementProxy",
    {
      address: managerAddress,
    }
  );

  const params = {
    address: from,
    sig: signedMessage,
    from: {
      ship: patp,
      proxy: "own",
    },
    data: {
      address: managerAddress,
    },
  };

  const res = await callRoller("set-management-proxy", params);

  return res;
};

export const requestNewSponsor = async (
  walletAddress: string,
  patp: string,
  from: string,
  newSponsorPatp: string
) => {
  const api = new RollerRPCAPI(options);
  const nonce = await api.getNonce({ ship: patp, proxy: "own" });
  const newSponsorPoint = ob.patp2dec(newSponsorPatp);

  const signedMessage = await generateHashAndSign(
    api,
    {},
    walletAddress,
    nonce,
    {
      ship: patp,
      proxy: "own",
    },
    "escape",
    {
      ship: newSponsorPatp,
    }
  );

  const params = {
    address: from,
    sig: signedMessage,
    from: {
      ship: patp,
      proxy: "own",
    },
    data: {
      ship: newSponsorPatp,
    },
  };

  const res = await callRoller("escape", params);

  return res;
};
