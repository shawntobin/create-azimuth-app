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

const callRoller = async (method: string, params: any) => {
  const requestId = Date.now().toString();

  console.log("callRoller", method, params);

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

export const getPoint = async (patp: string) => {
  const res = await callRoller("getPoint", { ship: patp });

  return res.result;
};

export const transferPoint = async (
  walletAddress: string,
  patp: string,
  from: From,
  to: string
) => {
  // to be moved, just for initial development

  const options: Options = {
    transport: {
      type: "https",
      host: "roller.urbit.org",
      port: 443,
      path: "/v1/roller",
    },
  };

  console.log("options", options);

  // type: "websocket" | "http" | "https" | "postmessagewindow" | "postmessageiframe";
  // host: string;
  // port: number;
  // path?: string;
  // protocol?: string;

  const api = new RollerRPCAPI(options);

  console.log("api", api);

  const nonce = await api.getNonce({ ship: patp, proxy: "own" });

  console.log("nonce", nonce);

  // const signedMessage = await generateHashAndSign(
  //   api,
  //   walletAddress,
  //   nonce,
  //   from,
  //   "transferPoint",
  //   {
  //     address: to,
  //     reset: false,
  //   }
  // );

  // const params = {
  //   address: from,
  //   sig: signedMessage,
  //   from: {
  //     ship: patp,
  //     proxy: "own",
  //   },
  //   data: {
  //     address: to,
  //     reset: false,
  //   },
  // };

  // const res = await callRoller("transferPoint", params);

  // return res;
};
