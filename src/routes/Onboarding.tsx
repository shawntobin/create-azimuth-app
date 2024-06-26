import Container from "../components/Container";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import useWalletStore from "../store/useWalletStore";

const Onboarding = () => {
  const navigate = useNavigate();
  const { selectedShip } = useWalletStore();

  return (
    <Container dropdown>
      <Button handleClick={() => {}} text="Get Hosted" />
      <Button handleClick={() => {}} text="Run it Yourself" />
    </Container>
  );
};
export default Onboarding;
