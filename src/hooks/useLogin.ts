import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useWalletStore from "../store/useWalletStore";
import * as txn from "../utils/transaction";
import * as ob from "urbit-ob";

const useLogin = () => {
  const navigate = useNavigate();
  const { setWalletAddress, setUrbitIds, setSelectedShip, resetState } =
    useWalletStore();

  const loginCommon = async (walletAddress: string) => {
    try {
      resetState();

      const ids = await txn.getPoints(walletAddress); // note if master ticket then could just use getPoint
      setWalletAddress(walletAddress);
      setUrbitIds(ids);

      if (ids.length === 1) {
        const ship = await txn.getShip(ob.patp(ids[0]));
        setSelectedShip(ship);
        const keysSet = ship.keyRevisionNumber > 0;

        if (!keysSet) {
          navigate(`/manage`); // change to 'onboarding' once implemented
          return;
        } else {
          navigate(`/manage`);
          return;
        }
      } else if (ids.length > 1) {
        navigate(`/wallet`);
      } else {
        // change to appropriate route when address holds no IDs
        navigate(`/wallet`);
      }
    } catch (error) {
      toast.error("Error logging in");
    }
  };

  return { loginCommon };
};

export default useLogin;
