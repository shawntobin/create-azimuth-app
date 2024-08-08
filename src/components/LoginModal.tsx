import Modal from "react-modal";
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const customStyles = {
  content: {
    top: "30%",
    left: "83%",
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

const LoginModal = ({ isOpen, handleClose, onClick }) => {
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
      <div className="w-[280px] h-[320px] text-[20px] justify-start items-center flex flex-col">
        <div className="text-[36px]">
          <span className="mr-0"></span>
          <span>Log in</span>
        </div>
        <div className="text-[16px] w-[236px] pb-4">
          Log in with any method below to receive, send, and manage your Urbit
          identity.
        </div>
        <button
          className={
            "text-white bg-black rounded-[10px] h-[36px] w-[230px] text-black text-[20px] font-bold items-center justify-center flex"
          }
          onClick={() => {}}
        >
          <WalletIcon className="w-5 h-5 text-white" />
          <span className="ml-2" onClick={onClick}>
            Connect Wallet
          </span>
        </button>
        <div className="border-b border-black w-[230px] my-3" />

        <div className="space-y-2 w-full items-center flex flex-col">
          <button
            className={
              "text-white bg-black rounded-[10px] h-[36px] w-[230px] text-black text-[20px] font-bold items-center justify-center flex"
            }
            onClick={() => {}}
          >
            <span className="ml-0">Master Ticket</span>
          </button>
          <button
            className={
              "text-white bg-black rounded-[10px] h-[36px] w-[230px] text-black text-[20px] font-bold items-center justify-center flex"
            }
            onClick={() => {}}
          >
            <span className="ml-0">Activation Code</span>
          </button>
          <button
            className={
              "text-white bg-black rounded-[10px] h-[36px] w-[230px] text-black text-[20px] font-bold items-center justify-center flex"
            }
            onClick={() => {}}
          >
            <span className="ml-0">Seed Phrase</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
