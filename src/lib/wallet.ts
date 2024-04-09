import bip39 from "bip39";
import * as bip32 from "bip32";
// import * as bip39 from 'bip39';

// import * as bitcoin from "bitcoinjs-lib";

export const walletFromMnemonic = (
  mnemonic: string,
  hdpath: string,
  passphrase?: string
) => {
  const seed = bip39.mnemonicToSeedSync(mnemonic, passphrase);

  const toWallet = (sd: Buffer, path: string) => {
    console.log("sd", sd);
    console.log("path", path);

    const hd = bip32.fromSeed(sd);
    const wal = hd.derivePath(path);
    wal.address = publicToAddress(wal.publicKey);
    wal.passphrase = passphrase || "";
    return wal;
  };

  const wallet = seed.chain((sd: Buffer) => toWallet(sd, hdpath));

  return wallet;
};
