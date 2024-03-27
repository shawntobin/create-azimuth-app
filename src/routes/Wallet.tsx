import Container from "../components/Container";
import UrbitIdSmall from "../components/UrbitIdSmall";
import useWalletStore from "../store/useWalletStore";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
  const { urbitIds } = useWalletStore();
  const navigate = useNavigate();

  const renderWallet = () => {
    return (
      <div className="flex flex-row flex-wrap items-center justify-center w-[500px]">
        {urbitIds.map((id) => (
          <UrbitIdSmall
            urbitId={id}
            key={id}
            handleClick={(patp: string) => navigate(`/manage/${patp}`)}
          />
        ))}
      </div>
    );
  };

  return <Container>{renderWallet()}</Container>;
};
export default Wallet;
