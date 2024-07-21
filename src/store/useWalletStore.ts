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
  setWalletAddress: (account: string) => void;
  setUrbitIds: (urbitIds: number[]) => void;
  setSelectedShip: (ship: Ship) => void;
  setWalletType: (type: string) => void;
  clearState: () => void;
}

const useWalletStore = create<WalletState>()(
  devtools(
    persist(
      (set) => ({
        walletType: "",
        walletAddress: "",
        urbitIds: [],
        selectedShip: {} as Ship,
        setWalletType: (type: string) => set({ walletType: type }),
        setWalletAddress: (account: string) => set({ walletAddress: account }),
        setUrbitIds: (urbitIds: number[]) => set({ urbitIds }),
        setSelectedShip: (ship: Ship) => set({ selectedShip: ship }),
        clearState: () =>
          set({
            walletType: "",
            walletAddress: "",
            urbitIds: [],
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
