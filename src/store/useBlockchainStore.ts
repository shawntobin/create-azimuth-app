import { create } from "zustand";
import Web3 from "web3";
import { initContractsPartial, azimuth } from "azimuth-js";

interface BlockchainState {
  provider: Web3.providers.HttpProvider | null;
  web3: Web3 | null;
  contracts: any;
  setProvider: (url: string) => Promise<void>;
  setWeb3: (provider: Web3.providers.HttpProvider) => void;
  setContracts: (web3: Web3, contractAddress: string) => Promise<void>;
}

const useBlockchainStore = create<BlockchainState>((set) => ({
  provider: null,
  web3: null,
  contracts: null,
  setProvider: async (url: string) => {
    const provider = new Web3.providers.HttpProvider(url);
    set({ provider });
  },
  setWeb3: (provider: Web3.providers.HttpProvider) => {
    const web3 = new Web3(provider);
    set({ web3 });
  },
  setContracts: async (web3: Web3, contractAddress: string) => {
    const contracts = await initContractsPartial(web3, contractAddress);
    set({ contracts });
  },
}));

export default useBlockchainStore;
