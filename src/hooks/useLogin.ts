import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useWalletStore from "../store/useWalletStore";
import { getPoints, getShip } from "../utils/azimuth";
import * as ob from "urbit-ob";

function useLogin() {
  const navigate = useNavigate();
  const { setWalletAddress, setUrbitIds, setSelectedShip } = useWalletStore();

  const loginCommon = async (walletAddress: string) => {
    try {
      const ids = await getPoints(walletAddress); // note if master ticket then could just use getPoint
      setWalletAddress(walletAddress);
      setUrbitIds(ids);

      if (ids.length === 1) {
        const ship = await getShip(ob.patp(ids[0]));
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
}

export default useLogin;
