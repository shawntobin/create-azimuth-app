import RollerRPCAPI, { From } from "@urbit/roller-api";
import { signTransactionHash } from "./authToken";
import { LOGIN_METHODS } from "../constants";

export const SECOND = 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;

export const generateHashAndSign = async (
  api: RollerRPCAPI,
  wallet: any,
  walletAddress: string,
  walletType: symbol,
  nonce: number,
  from: From,
  type: string,
  data: any
) => {
  // metamask

  let sig;

  // currently only configured for metamask
  if (LOGIN_METHODS.BLOCKNATIVE === walletType) {
    const hash = await api.prepareForSigning(nonce, from, type, data);

    if (window.ethereum) {
      sig = window.ethereum.request({
        method: "personal_sign",
        params: [hash, walletAddress],
        from: walletAddress,
      });
    } else {
      console.log("no window.ethereum");
      // sig = await web3.eth.personal.sign(hash, wallet.address, "");
    }

    // seed phrase etc
  } else if (LOGIN_METHODS.TICKET === walletType) {
    const hash = await api.getUnsignedTx(nonce, from, type, data);
    const sig = await signTransactionHash(hash, wallet.privateKey);
    return sig;
  }

  return sig;
};
