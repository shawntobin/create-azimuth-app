import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import * as ob from "urbit-ob";
import Ship from "../types/Ship";

// selectedWallet: EIP6963ProviderDetail | null;
// setSelectedWallet: (wallet: EIP6963ProviderDetail | null) => void;

interface WalletState {
  walletAddress: string;
  urbitIds: number[];
  selectedShip: Ship;
  currentUrbitId: string;
  currentIdNum: number;
  setWalletAddress: (account: string) => void;
  setUrbitIds: (urbitIds: number[]) => void;
  setSelectedShip: (ship: Ship) => void;
}

const useWalletStore = create<WalletState>()(
  devtools(
    persist(
      (set) => ({
        walletAddress: "",
        urbitIds: [],
        currentUrbitId: "",
        currentIdNum: 0,
        selectedShip: {} as Ship,
        setWalletAddress: (account: string) => set({ walletAddress: account }),
        setUrbitIds: (urbitIds: number[]) => set({ urbitIds }),
        setSelectedShip: (ship: Ship) => set({ selectedShip: ship }),
      }),
      {
        name: "wallet-storage",
      }
    )
  )
);

export default useWalletStore;
