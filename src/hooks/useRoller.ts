import { submitL2Transaction } from "../lib/roller";

import useWalletStore from "../store/useWalletStore";
import useAzimuthStore from "../store/useAzimuthStore";
import Point, { PointField, Points } from "../types/Point";

import {
  Config,
  Ship,
  Proxy,
  RollerRPCAPI,
  EthAddress,
} from "@urbit/roller-api";

const useRoller = () => {
  const { currentIdNum } = useWalletStore();

  const transferPoint = async (address: EthAddress, reset?: boolean) => {
    const _point = currentIdNum;
    const _wallet = wallet.getOrElse(null);
    const _web3 = web3.getOrElse(null);

    const proxy = point.getTransferProxy();

    if (proxy === undefined)
      throw new Error("Error: Address doesn't match proxy");

    const nonce = await api.getNonce({ ship: _point, proxy });

    const txHash = await submitL2Transaction({
      api,
      wallet: _wallet,
      ship: _point,
      proxy,
      nonce,
      address,
      type: "transferPoint",
      reset,
    });

    return api.getPendingTx(txHash);
  };

  return {
    transferPoint,
  };
};

export default useRoller;
