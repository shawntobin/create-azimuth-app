import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // for devtools

interface WalletState {
  // selectedWallet: EIP6963ProviderDetail | null;
  userAccount: string;
  // setSelectedWallet: (wallet: EIP6963ProviderDetail | null) => void;
  setUserAccount: (account: string) => void;
}

const useWalletStore = create<WalletState>()(
  devtools(
    persist(
      (set) => ({
        // selectedWallet: null,
        userAccount: "",
        // setSelectedWallet: (wallet: EIP6963ProviderDetail | null) =>
        //   set({ selectedWallet: wallet }),
        setUserAccount: (account: string) => set({ userAccount: account }),
      }),
      {
        name: "wallet-storage",
      }
    )
  )
);

export default useWalletStore;
