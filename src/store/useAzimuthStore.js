import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const useAzimuthStore = create(
  persist(
    (set) => ({
      urbitContracts: {},
      setUrbitContracts: (contracts) => set({ urbitContracts: contracts }),
    }),
    {
      name: "azimuth-storage",
    }
  )
);
export default useAzimuthStore;
