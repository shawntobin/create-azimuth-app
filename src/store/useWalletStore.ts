import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // for devtools

interface WalletState {
  // selectedWallet: EIP6963ProviderDetail | null;
  userAccount: string;
  // setSelectedWallet: (wallet: EIP6963ProviderDetail | null) => void;
  urbitIds: number[];
  setUserAccount: (account: string) => void;
  setUrbitIds: (urbitIds: number[]) => void;
}

const useWalletStore = create<WalletState>()(
  devtools(
    persist(
      (set) => ({
        // selectedWallet: null,
        userAccount: "",
        urbitIds: [],
        // setSelectedWallet: (wallet: EIP6963ProviderDetail | null) =>
        //   set({ selectedWallet: wallet }),
        setUserAccount: (account: string) => set({ userAccount: account }),
        setUrbitIds: (urbitIds: number[]) => set({ urbitIds }),
      }),
      {
        name: "wallet-storage",
      }
    )
  )
);

export default useWalletStore;
