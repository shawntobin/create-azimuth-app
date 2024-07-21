import useWalletStore from "../store/useWalletStore";
import * as txn from "../utils/transaction";

export const useRefresh = () => {
  const { setSelectedShip, setUrbitIds, walletAddress, selectedShip } =
    useWalletStore();

  const refresh = async (type: string) => {
    try {
      if (type === "ship" && selectedShip.patp) {
        const ship = await txn.getShip(selectedShip.patp);
        setSelectedShip(ship);
      } else if (type === "ids") {
        const ids = await txn.getPoints(walletAddress);
        setUrbitIds(ids);
      } else if (type === "all") {
        const ship = await txn.getShip(selectedShip.patp);
        setSelectedShip(ship);
        const ids = await txn.getPoints(walletAddress);
        setUrbitIds(ids);
      } else {
        throw new Error("Invalid refresh type or missing parameters");
      }
    } catch (error) {
      console.error(`Failed to refresh ${type}:`, error);
    }
  };

  return { refresh };
};
