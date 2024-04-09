import Container from "../components/Container";
import UrbitIdSmall from "../components/UrbitIdSmall";
import useWalletStore from "../store/useWalletStore";
import { useNavigate } from "react-router-dom";
import { getPoint } from "../utils/azimuth";
import Ship from "../types/Ship";

const Wallet = () => {
  const { urbitIds, setSelectedShip } = useWalletStore();
  const navigate = useNavigate();

  const handleSelectUrbitId = async (patp: string, id: number) => {
    const _ship = await getPoint(patp);

    const ship: Ship = {
      patp: patp,
      point: id,
      layer: _ship.dominion,
      owner: _ship.ownership.owner.address,
      keyRevisionNumber: _ship.network.keys.life,
      hasSponsor: _ship.network.sponsor.has,
      sponsor: _ship.network.sponsor.who,
      spawnProxy: _ship.ownership.spawnProxy.address,
      managementProxy: _ship.ownership.managementProxy.address,
      transferProxy: _ship.ownership.transferProxy.address,
      votingProxy: _ship.ownership.votingProxy.address,
    };

    console.log("ship", ship);
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
            handleClick={(patp: string, id: number) =>
              handleSelectUrbitId(patp, id)
            }
          />
        ))}
      </div>
    );
  };

  return <Container>{renderWallet()}</Container>;
};
export default Wallet;
