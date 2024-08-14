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

export const isStar = (patp: string) => {
  return ob.clan(patp) === "star";
};

export const isPlanet = (patp: string) => {
  return ob.clan(patp) === "planet";
};

export const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " . ");
};

export const isValidHex = (hex: string) => /^#([0-9A-F]{3}){1,2}$/i.test(hex);

export const calculateMaxTransactionCost = (fee, gasLimit) => {
  const maxFeePerGas = parseFloat(fee.suggestedMaxFeePerGas);
  const maxPriorityFeePerGas = parseFloat(fee.suggestedMaxPriorityFeePerGas);
  const maxCost = ((maxFeePerGas + maxPriorityFeePerGas) * gasLimit) / 1e9; // gwei to Ether
  return maxCost.toFixed(6);
};

export const convertToSeconds = (milliseconds) =>
  (milliseconds / 1000).toFixed(0);

export const formatPatp = (patp: string) => {
  if (typeof patp !== "string" || patp.length === 0) {
    return patp;
  }

  if (patp.substring(0, 1) === "~") {
    return patp.toLowerCase();
  } else if (patp.substring(0, 1) !== "~") {
    return `~${patp.toLowerCase()}`;
  }
};

export const addHexPrefix = (hex: string) => {
  return hex.startsWith("0x") ? hex : `0x${hex}`;
};

export const hexify = (val: string | Buffer) =>
  addHexPrefix(val.toString("hex"));

export const capitalize = (s: string) => {
  if (!s || s === "") {
    return s;
  }

  return s.charAt(0).toUpperCase() + s.slice(1);
};

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

export const formatEventString = (str) => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
