import { init, useConnectWallet } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import Web3 from "web3";

// Initialize web3-onboard with the injected wallets (MetaMask)

export const signMessage = async (wallet) => {
  const provider = new Web3.providers.HttpProvider(PROVIDER_URL);
  const web3 = new Web3(provider);

  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  const message = "Hello, this is a test message!";
  const signature = await web3.eth.personal.sign(message, account, "");

  console.log("Signed Message:", signature);

  return signature;
};
