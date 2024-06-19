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
