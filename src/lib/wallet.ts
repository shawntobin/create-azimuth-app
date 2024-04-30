import * as bip39 from "bip39";
import BIP32Factory from "bip32";
import * as ecc from "tiny-secp256k1";
import { BIP32Interface } from "bip32";
import { publicToAddress } from "../utils";
import { DEFAULT_HD_PATH } from "../constants/constants";
import * as kg from "urbit-key-generation";

export const walletFromMnemonic = (
  mnemonic: string,
  hdpath: string = DEFAULT_HD_PATH,
  passphrase?: string
) => {
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error("Invalid mnemonic"); // toast alert ?
  }

  const seed = bip39.mnemonicToSeedSync(mnemonic, passphrase);

  const bip32 = BIP32Factory(ecc);

  const root: BIP32Interface = bip32.fromSeed(seed);
  const node: BIP32Interface = root.derivePath(hdpath);

  const publicKey = node.publicKey;
  const address = publicToAddress(publicKey);

  const wallet = {
    address: address,
    publicKey: publicKey.toString("hex"),
  };

  return wallet;
};

export const urbitWalletFromTicket = async (
  ticket: string,
  point: number,
  passphrase?: string
) => {
  return await kg.generateWallet({
    ticket: ticket,
    ship: point,
    passphrase: passphrase,
  });
};
