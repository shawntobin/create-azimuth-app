import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useWalletStore from "../store/useWalletStore";
import * as L2 from "../utils/transactionL2";
import * as L1 from "../utils/transactionL1";
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
        navigate(`/manage`); // include urbit id in route ?
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
