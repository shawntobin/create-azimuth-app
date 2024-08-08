import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import Ship from "../types/Ship";

// selectedWallet: EIP6963ProviderDetail | null;
// setSelectedWallet: (wallet: EIP6963ProviderDetail | null) => void;

interface WalletState {
  urbitWallet: UrbitWallet | null;
  authToken: string;
  walletType: symbol;
  walletLabel: string;
  walletAddress: string; // may not be preserving checksum format?
  urbitIds: number[];
  selectedShip: Ship;
  ethBalance: string;
  setUrbitWallet: (wallet: UrbitWallet | null) => void;
  setAuthToken: (token: string) => void;
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
        authToken: "",
        walletType: Symbol("UNINITIALIZED"),
        walletLabel: "",
        walletAddress: "",
        urbitIds: [],
        selectedShip: {} as Ship,
        ethBalance: "",
        setUrbitWallet: (wallet: UrbitWallet | null) =>
          set({ urbitWallet: wallet }),
        setAuthToken: (token: string) => set({ authToken }),
        setWalletType: (type: symbol) => set({ walletType: type }),
        setWalletLabel: (label: string) => set({ walletLabel: label }),
        setWalletAddress: (account: string) => set({ walletAddress: account }),
        setUrbitIds: (urbitIds: number[]) => set({ urbitIds }),
        setSelectedShip: (ship: Ship) => set({ selectedShip: ship }),
        setEthBalance: (balance: string) => set({ ethBalance: balance }),
        clearState: () =>
          set({
            urbitWallet: null,
            authToken: "",
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
