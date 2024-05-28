import { toChecksumAddress } from "web3-utils";
import { pubToAddress } from "@ethereumjs/util";
import { ETH_ZERO_ADDR, ETH_ZERO_ADDR_SHORT } from "../constants/constants";
import { isAddress } from "web3-validator";

export const stripHexPrefix = (hex: string) => {
  return hex.startsWith("0x") ? hex.slice(2) : hex;
};

export const addHexPrefix = (hex: string) => {
  return hex.startsWith("0x") ? hex : `0x${hex}`;
};

// export const isAddressString = (text: string) => {
//   return text.startsWith("0x") && text.length === 42;
// };

export const isValidAddress = (a: string | boolean | undefined) => {
  if (!a || typeof a !== "string") {
    return;
  }

  return "0x0" === a || isAddress(a);
};

export const abbreviateAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

export const isZeroAddress = (a: string) =>
  a === ETH_ZERO_ADDR || a === ETH_ZERO_ADDR_SHORT;

export const eqAddr = (addr0: string, addr1: string) =>
  !addr0 || !addr1
    ? false
    : toChecksumAddress(addr0) === toChecksumAddress(addr1);

export const publicToAddress = (publicKey: Buffer): string => {
  return "0x" + pubToAddress(publicKey, true).toString("hex");
};

export const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
