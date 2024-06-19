import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AppState {
  showAlert: boolean;
  setShowAlert: (showAlert: boolean) => void;
}

const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        showAlert: true,
        setShowAlert: (showAlert: boolean) => set({ showAlert }),
      }),
      {
        name: "app-storage",
      }
    )
  )
);

export default useAppStore;
