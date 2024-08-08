import Container from "../components/Container";
import UrbitIdCard from "../components/UrbitIdCard";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import useWalletStore from "../store/useWalletStore";
import BackButton from "../components/BackButton";

const Manage = () => {
  const navigate = useNavigate();
  const { selectedShip } = useWalletStore();

  return (
    <Container dropdown>
      <div className="mt-20 mb-5 w-[540px]">
        <BackButton />
      </div>
      <UrbitIdCard ship={selectedShip} className={"mb-[15px]"} />
      <div className="flex-row flex space-x-4">
        <Button handleClick={() => navigate("/hosting")} text="Set up Planet" />
        <Button
          handleClick={() => navigate(`/manage/advanced`)}
          text="Control Panel"
        />
      </div>
    </Container>
  );
};
export default Manage;
