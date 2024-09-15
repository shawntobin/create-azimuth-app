import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import Ship from "../types/Ship";

interface WalletState {
  urbitWallet: UrbitWallet | null;
  walletType: symbol;
  walletLabel: string;
  walletAddress: string;
  urbitIds: number[];
  selectedShip: Ship;
  ethBalance: string;
  setUrbitWallet: (wallet: UrbitWallet | null) => void;
  setWalletAddress: (account: string) => void;
  setUrbitIds: (urbitIds: number[]) => void;
  setSelectedShip: (ship: Ship) => void;
  setWalletType: (type: symbol) => void;
  setWalletLabel: (label: string) => void;
  setEthBalance: (balance: string) => void;
  clearState: () => void;
}

const useWalletStore = create<WalletState>()(
  devtools(
    persist(
      (set) => ({
        urbitWallet: null,
        walletType: Symbol("UNINITIALIZED"),
        walletLabel: "",
        walletAddress: "",
        urbitIds: [],
        selectedShip: {} as Ship,
        ethBalance: "",
        setUrbitWallet: (wallet: UrbitWallet | null) =>
          set({ urbitWallet: wallet }),
        setWalletType: (type: symbol) => set({ walletType: type }),
        setWalletLabel: (label: string) => set({ walletLabel: label }),
        setWalletAddress: (account: string) => set({ walletAddress: account }),
        setUrbitIds: (urbitIds: number[]) => set({ urbitIds }),
        setSelectedShip: (ship: Ship) => set({ selectedShip: ship }),
        setEthBalance: (balance: string) => set({ ethBalance: balance }),
        clearState: () =>
          set({
            urbitWallet: null,
            walletType: Symbol("UNINITIALIZED"),
            walletLabel: "",
            walletAddress: "",
            urbitIds: [],
            selectedShip: {} as Ship,
            ethBalance: "",
          }),
      }),
      {
        name: "wallet-storage",
      }
    )
  )
);

export default useWalletStore;
