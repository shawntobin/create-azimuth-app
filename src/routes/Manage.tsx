import { useState } from "react";
import Container from "../components/Container";
import UrbitIdCard from "../components/UrbitIdCard";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import useWalletStore from "../store/useWalletStore";
import BackButton from "../components/BackButton";
import InfoButton from "../components/InfoButton";
import InfoModal from "../components/InfoModal";
import { INFO_MODAL_TEXT } from "../constants/content";
import { ROUTE_MAP } from "./routeMap";

const Manage = () => {
  const navigate = useNavigate();
  const { selectedShip } = useWalletStore();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <Container dropdown>
      <InfoModal
        text={INFO_MODAL_TEXT.MANAGE_ID}
        isOpen={showInfo}
        handleClose={() => setShowInfo(false)}
      />
      <div className="mt-20 mb-5 w-[540px] flex justify-between">
        <BackButton route={ROUTE_MAP.IDS} />
        <InfoButton onClick={() => setShowInfo(true)} />
      </div>
      <UrbitIdCard ship={selectedShip} className={"mb-[15px]"} />
      <div className="flex-row flex space-x-4">
        <Button
          handleClick={() => navigate(ROUTE_MAP.SET_UP)}
          text="Set up Planet"
        />
        <Button
          handleClick={() => navigate(ROUTE_MAP.SETTINGS)}
          text="Settings"
        />
      </div>
    </Container>
  );
};
export default Manage;
