import RollerRPCAPI, { From } from "@urbit/roller-api";

export const generateHashAndSign = async (
  api: RollerRPCAPI,
  walletAddress: string,
  nonce: number,
  from: From,
  type: string,
  data: any
) => {
  // metamask
  const hash = await api.prepareForSigning(nonce, from, type, data);

  let sig;

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
  // else {
  //   const hash = await api.getUnsignedTx(nonce, from, type, data);
  //   const sig = await signTransactionHash(hash, wallet.privateKey);
  //   return sig;
  // }

  return sig;
};
