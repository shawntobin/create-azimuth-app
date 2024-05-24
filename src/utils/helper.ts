import toast from "react-hot-toast";
import { pubToAddress } from "@ethereumjs/util";
import * as ob from "urbit-ob";

export const copy = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard");
};

export const isGalaxy = (patp: string) => {
  return ob.clan(patp) === "galaxy";
};

export const isAddress = (text: string) => {
  return text.startsWith("0x") && text.length === 42;
};

export const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const publicToAddress = (publicKey: Buffer): string => {
  return "0x" + pubToAddress(publicKey, true).toString("hex");
};

export const stripHexPrefix = (hex: string) => {
  return hex.startsWith("0x") ? hex.slice(2) : hex;
};
