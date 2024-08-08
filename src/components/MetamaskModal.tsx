import Modal from "react-modal";
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { formatAddress } from "../utils/address";

const customStyles = {
  content: {
    top: "20%",
    left: "81%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFFFFF",
    color: "#000000",
    font: 20,
    borderRadius: 10,
    // height: 193,
    padding: 10,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.7)",
  },
};

Modal.setAppElement("#root");

const MetamaskModal = ({
  isOpen,
  handleClose,
  onClick,
  walletAddress,
  ethBalance,
}) => {
  const navigate = useNavigate();

  return (
    <Modal
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      isOpen={isOpen}
      onAfterOpen={() => {}}
      onRequestClose={handleClose}
      style={customStyles}
    >
      <div className="w-[280px] h-[160px] text-[20px] justify-start items-center flex flex-col p-4">
        <div className="text-[32px] w-full  text-left">
          <div>Metamask</div>
          <div className="text-[20px] text-[#5A5A55]">
            {formatAddress(walletAddress)}
          </div>
        </div>

        <div className="space-y-2 w-full items-center flex flex-col">
          <button
            className={
              "mt-2 bg-[#E72E2E] text-black rounded-[10px] h-[36px] w-full text-black text-[20px] font-bold items-center justify-center flex"
            }
            onClick={onClick}
          >
            <span className="mt-0">Disconnect</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MetamaskModal;
