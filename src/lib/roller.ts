import RollerRPCAPI, { From } from "@urbit/roller-api";

export const generateHashAndSign = async (
  api: RollerRPCAPI,
  walletAddress: string,
  nonce: number,
  from: From,
  type: string,
  data: any
) => {
  const hash = await api.prepareForSigning(nonce, from, type, data);

  console.log("hash", hash);

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

  return sig;
};
