import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useWalletStore from "../store/useWalletStore";
import * as txn from "../utils/transaction";
import * as ob from "urbit-ob";

const useLogin = () => {
  const navigate = useNavigate();
  const {
    setWalletAddress,
    setUrbitIds,
    setSelectedShip,
    clearState,
    setWalletLabel,
    setWalletType,
    setUrbitWallet,
    setEthBalance,
  } = useWalletStore();

  const loginCommon = async (
    walletAddress: string,
    walletType: symbol,
    walletLabel?: string,
    ethBalance?: string | null,
    urbitWallet?: UrbitWallet | null
  ) => {
    try {
      clearState();

      const ids = await txn.getPoints(walletAddress);
      setWalletAddress(walletAddress);
      setWalletType(walletType);
      setWalletLabel(walletLabel || "Master Ticket");
      setUrbitWallet(urbitWallet);
      setEthBalance(ethBalance);
      setUrbitIds(ids);

      if (ids.length === 1) {
        const ship = await txn.getShip(ob.patp(ids[0]));
        setSelectedShip(ship);
        navigate("/my-app");
      } else {
        navigate("/ids");
      }
    } catch (error) {
      toast.error("Error logging in");
    }
  };

  return { loginCommon };
};

export default useLogin;
