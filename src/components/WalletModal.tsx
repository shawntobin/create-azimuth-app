import Modal from "react-modal";
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  WalletIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { formatAddress } from "../utils/address";
import { copy } from "../utils/helper";

const customStyles = {
  content: {
    top: "25%",
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
    padding: 0,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.7)",
  },
};

Modal.setAppElement("#root");

const WalletModal = ({
  isOpen,
  walletAddress,
  ethBalance,
  walletLabel,
  handleClose,
  handleSwitchWallet,
  handleDisconnect,
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
      <div className="w-[280px] h-[270px] text-[20px] justify-start items-center flex flex-col px-4 py-1">
        <div className="text-[32px] w-full text-left">
          {/* <div>Metamask</div> */}
          <div
            className="text-[20px] text-[#5A5A55] flex items-center"
            onClick={() => copy(walletAddress)}
          >
            {formatAddress(walletAddress)}
            <button className="bg-transparent pl-2 m-0 align-left border-none focus:outline-none">
              <DocumentDuplicateIcon className="h-6 w-6 stroke-1" />
            </button>
          </div>
          <div className="border rounded-[10px] w-full border-black flex-col text-[20px]">
            <div className="flex justify-between m-2">
              <div>Wallet</div>
              <div className="font-bold">{walletLabel}</div>
            </div>

            <div className="border border-b" />
            <div className="flex justify-between m-2">
              <div>Balance</div>
              <div className="font-bold">{`${parseFloat(ethBalance).toFixed(
                2
              )} ETH`}</div>
            </div>
          </div>
        </div>

        <div className="space-y-2 w-full items-center flex flex-col mt-2">
          <button
            className={
              "mt-2 bg-black text-black rounded-[10px] h-[36px] w-full text-white text-[20px] font-bold items-center justify-center flex"
            }
            onClick={handleSwitchWallet}
          >
            <span className="mt-0">Switch Wallet</span>
          </button>
          <button
            className={
              "mt-2 bg-[#E72E2E] text-black rounded-[10px] h-[36px] w-full text-black text-[20px] font-bold items-center justify-center flex"
            }
            onClick={handleDisconnect}
          >
            <span className="mt-0">Disconnect</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WalletModal;
