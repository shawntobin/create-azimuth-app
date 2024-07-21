import Onboard from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import { PROVIDER_URL } from "../constants";

const injected = injectedModule();

// Gnosis safe
// Trezor
// Coinbase Wallet

const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: "0x1",
      token: "ETH",
      label: "Ethereum Mainnet",
      rpcUrl: PROVIDER_URL,
    },
    {
      id: "0xaa36a7",
      token: "ETH",
      label: "Sepolia Testnet",
      rpcUrl: PROVIDER_URL.replace("mainnet", "sepolia"),
    },
  ],
});

const wallets = await onboard.connectWallet();

console.log(wallets);
