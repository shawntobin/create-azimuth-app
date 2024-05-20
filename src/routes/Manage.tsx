import Container from "../components/Container";
import UrbitIdCard from "../components/UrbitIdCard";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import useWalletStore from "../store/useWalletStore";

const Manage = () => {
  const navigate = useNavigate();
  const { selectedShip } = useWalletStore();

  return (
    <Container headerText={`Urbit ID  /`} dropdown>
      <UrbitIdCard ship={selectedShip} className={"mb-10 mt-20"} />
      <Button handleClick={() => {}} text="Host your Planet" />
      <Button handleClick={() => {}} text="Download your Passport" />
      <Button
        handleClick={() => navigate(`/manage/advanced`)}
        text="Advanced Settings"
      />
    </Container>
  );
};
export default Manage;
