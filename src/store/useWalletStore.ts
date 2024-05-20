import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import Ship from "../types/Ship";

// selectedWallet: EIP6963ProviderDetail | null;
// setSelectedWallet: (wallet: EIP6963ProviderDetail | null) => void;

interface WalletState {
  walletType: string;
  walletAddress: string; // may not be preserving checksum format?
  urbitIds: number[];
  selectedShip: Ship;
  currentIdNum: number;
  setWalletAddress: (account: string) => void;
  setUrbitIds: (urbitIds: number[]) => void;
  setSelectedShip: (ship: Ship) => void;
  setWalletType: (type: string) => void;
  resetState: () => void;
}

const useWalletStore = create<WalletState>()(
  devtools(
    persist(
      (set) => ({
        walletType: "",
        walletAddress: "",
        urbitIds: [],
        currentIdNum: 0,
        selectedShip: {} as Ship,
        setWalletType: (type: string) => set({ walletType: type }),
        setWalletAddress: (account: string) => set({ walletAddress: account }),
        setUrbitIds: (urbitIds: number[]) => set({ urbitIds }),
        setSelectedShip: (ship: Ship) => set({ selectedShip: ship }),
        resetState: () =>
          set({
            walletType: "",
            walletAddress: "",
            urbitIds: [],
            currentIdNum: 0,
            selectedShip: {} as Ship,
          }),
      }),
      {
        name: "wallet-storage",
      }
    )
  )
);

export default useWalletStore;
