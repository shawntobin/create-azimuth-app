import Container from "../components/Container";
import UrbitIdSmall from "../components/UrbitIdSmall";
import useWalletStore from "../store/useWalletStore";
import { useNavigate } from "react-router-dom";
// import { getShip } from "../utils/transactionL2";
import * as txn from "../utils/transaction";

const Wallet = () => {
  const { urbitIds, setSelectedShip } = useWalletStore();
  const navigate = useNavigate();

  const handleSelectUrbitId = async (patp: string) => {
    const ship = await txn.getShip(patp);
    setSelectedShip(ship);
    const keysSet = ship.keyRevisionNumber > 0;

    if (!keysSet) {
      navigate(`/manage`); // change to 'onboarding' once implemented
      return;
    } else {
      navigate(`/manage`);
      return;
    }
  };

  const renderWallet = () => {
    return (
      <div className="flex flex-row flex-wrap items-center justify-center w-[500px]">
        {urbitIds.map((id) => (
          <UrbitIdSmall
            urbitId={id}
            key={id}
            handleClick={(patp: string) => handleSelectUrbitId(patp)}
          />
        ))}
      </div>
    );
  };

  return <Container>{renderWallet()}</Container>;
};
export default Wallet;
