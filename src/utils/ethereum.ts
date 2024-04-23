import { pubToAddress } from "@ethereumjs/util";

export const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const publicToAddress = (publicKey: Buffer): string => {
  return "0x" + pubToAddress(publicKey, true).toString("hex");
};
