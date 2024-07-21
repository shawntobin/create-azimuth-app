import { useEffect } from "react";
import Container from "../components/Container";
import UrbitIdCard from "../components/UrbitIdCard";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import useWalletStore from "../store/useWalletStore";

const Manage = () => {
  const navigate = useNavigate();
  const { selectedShip } = useWalletStore();

  return (
    <Container dropdown>
      <UrbitIdCard ship={selectedShip} className={"mb-10 mt-20"} />
      <div className="flex-row flex">
        <Button handleClick={() => navigate("/hosting")} text="Set up Planet" />
        <Button
          handleClick={() => navigate("/sigil-generator")}
          text="Sigil Generator"
        />
        <Button
          handleClick={() => navigate(`/manage/advanced`)}
          text="Control Panel"
        />
      </div>
    </Container>
  );
};
export default Manage;
