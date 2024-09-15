import toast from "react-hot-toast";
import * as ob from "urbit-ob";

export const copy = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard");
};

export const isGalaxy = (patp: string) => {
  return ob.clan(patp) === "galaxy";
};

export const isStar = (patp: string) => {
  return ob.clan(patp) === "star";
};

export const isPlanet = (patp: string) => {
  return ob.clan(patp) === "planet";
};

export const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " . ");
};

export const addHexPrefix = (hex: string) => {
  return hex.startsWith("0x") ? hex : `0x${hex}`;
};

export const hexify = (val: string | Buffer) =>
  addHexPrefix(val.toString("hex"));

export const formatSpacedPatp = (patp: string) => {
  if (typeof patp !== "string" || patp.length === 0) {
    return patp;
  }

  if (patp.substring(0, 1) === "~") {
    return patp.toLowerCase().replace("~", "~ ");
  } else if (patp.substring(0, 1) !== "~") {
    return `~ ${patp.toLowerCase()}`;
  }
};

export const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
