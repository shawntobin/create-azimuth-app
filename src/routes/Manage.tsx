import Container from "../components/Container";
import UrbitIdCard from "../components/UrbitIdCard";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import useWalletStore from "../store/useWalletStore";

const Manage = () => {
  const navigate = useNavigate();
  const { selectedShip } = useWalletStore();

  const { patp } = selectedShip;

  return (
    <Container>
      <UrbitIdCard patp={patp} />

      <Button
        handleClick={() => {}}
        text="Host your Planet"
        className="mt-8 mb-3 w-[500px] h-[60px]"
        secondaryText="Run your ship on a cloud server via one of Urbit’s hosting provider"
      />
      <Button
        handleClick={() => {}}
        text="Download your Passport"
        className="mb-3 w-[500px] h-[60px]"
      />
      <Button
        handleClick={() => navigate(`/manage/advanced`)}
        text="Advanced Settings"
        className="mb-3 w-[500px] h-[60px]"
        secondaryColor
      />
    </Container>
  );
};
export default Manage;
