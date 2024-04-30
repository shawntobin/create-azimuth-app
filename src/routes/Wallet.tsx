import Container from "../components/Container";
import UrbitIdSmall from "../components/UrbitIdSmall";
import useWalletStore from "../store/useWalletStore";
import { useNavigate } from "react-router-dom";
import { getShip } from "../utils/azimuth";

const Wallet = () => {
  const { urbitIds, setSelectedShip } = useWalletStore();
  const navigate = useNavigate();

  const handleSelectUrbitId = async (patp: string) => {
    const ship = await getShip(patp);
    setSelectedShip(ship);
    navigate(`/manage`, { state: { ship } });
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
