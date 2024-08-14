import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useWalletStore from "../store/useWalletStore";
import * as txn from "../utils/transaction";
import * as ob from "urbit-ob";
import { ROUTE_MAP } from "../routes/routeMap";

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

      const ids = await txn.getPoints(walletAddress); // note if master ticket then could just use getPoint
      setWalletAddress(walletAddress);
      setWalletType(walletType);
      setWalletLabel(walletLabel || "Master Ticket");
      setUrbitWallet(urbitWallet);
      setEthBalance(ethBalance);
      setUrbitIds(ids);

      if (ids.length === 1) {
        const ship = await txn.getShip(ob.patp(ids[0]));
        setSelectedShip(ship);
        const keysSet = ship.keyRevisionNumber > 0;

        if (!keysSet) {
          navigate(ROUTE_MAP.MANAGE); // change to 'onboarding' once implemented
          return;
        } else {
          navigate(ROUTE_MAP.MANAGE);
          return;
        }
      } else if (ids.length > 1) {
        navigate(ROUTE_MAP.IDS);
      } else {
        navigate(ROUTE_MAP.IDS);
      }
    } catch (error) {
      toast.error("Error logging in");
    }
  };

  return { loginCommon };
};

export default useLogin;
