import { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import toast from "react-hot-toast";
import useLogin from "../hooks/useLogin";
import { urbitWalletFromTicket } from "../lib/wallet";
import * as ob from "urbit-ob";
import { WALLET_TYPES } from "../constants";
import Web3 from "web3";
import { PROVIDER_URL } from "../constants";

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
    paddingBottom: 40,
    // width: 361,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.7)",
  },
};

const MODAL_TYPES = {
  MAIN: "MAIN",
  MASTER_TICKET: "MASTER_TICKET",
  SEED_PHRASE: "SEED_PHRASE",
  ACTIVATION_CODE: "ACTIVATION_CODE",
};

Modal.setAppElement("#root");

const LoginModal = ({ isOpen, handleClose, onClick }) => {
  const navigate = useNavigate();
  const [urbitIdInput, setUrbitIdInput] = useState("");
  const [masterTicket, setMasterTicket] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modalType, setModalType] = useState(MODAL_TYPES.MAIN);

  const { loginCommon } = useLogin();

  const handleTicketLogin = async () => {
    // navigate("/activation");

    try {
      const point = ob.patp2dec(urbitIdInput);
      const urbitWallet = await urbitWalletFromTicket(masterTicket, point);
      const walletAddress = urbitWallet.ownership.keys.address;

      console.log("urbitWallet", urbitWallet);

      const provider = new Web3.providers.HttpProvider(PROVIDER_URL);
      const web3 = new Web3(provider);
      const balance = await web3.eth.getBalance(walletAddress);
      const balanceFormatted = web3.utils.fromWei(balance, "ether");
      console.log("balance", balance);
      console.log("balanceFormatted", balanceFormatted);

      if (urbitWallet) {
        toast.success("Connected using Master Ticket");
        loginCommon(
          walletAddress,
          WALLET_TYPES.TICKET,
          "",
          balanceFormatted,
          urbitWallet
        );
      } else {
        toast.error("Invalid wallet credentials");
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const renderMasterTicketLogin = () => {
    return (
      <div className="w-[361px] text-[20px] justify-start items-center flex flex-col p-5">
        <div className="text-[36px] flex items-center justify-start w-[291px]">
          <span className="mr-4">
            <button
              onClick={() => setModalType(MODAL_TYPES.MAIN)}
              className="h-[22px] w-[22px] p-0 pb-1 mr-3 text-[25px] border border-black rounded-[7px] flex items-center justify-center bg-transparent focus:outline-none focus:bg-transparent active:bg-transparent hover:text-secondary-color text-black"
            >
              {`<`}
            </button>
          </span>
          <span>Master Ticket</span>
        </div>
        <div className="text-[16px] w-[266px] pb-4">
          Enter your planet, star or galaxy name and your 12 to 24 syllable
          master ticket phrase.
        </div>

        <div className="space-y-2 w-full items-center flex flex-col w-[291px]">
          <input
            type="text"
            spellCheck="false"
            placeholder="~sampel-palnet"
            className="pl-4 pr-4 py-0 w-full h-[38px] font-[500] text-[18px] bg-transparent placeholder-secondary-color text-black border border-black rounded-[10px]"
            onChange={(e) => setUrbitIdInput(e.currentTarget.value)}
            value={urbitIdInput}
          />
          <input
            type="text"
            spellCheck="false"
            placeholder="Master Ticket"
            className="pl-4 pr-4 py-0 w-full h-[38px] font-[500] text-[18px] bg-transparent placeholder-secondary-color text-black border border-black rounded-[10px]"
            onChange={(e) => setMasterTicket(e.currentTarget.value)}
            value={masterTicket}
          />
          {/* <button
            className="absolute inset-y-0 right-1 top-[88px] flex items-center justify-center bg-transparent text-black decoration-0 focus:outline-none hover:border-none border-none"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-4 w-4 text-black" />
            ) : (
              <EyeIcon className="h-4 w-4 text-black" />
            )}
          </button> */}

          <button
            className={
              "text-white bg-black rounded-[10px] h-[36px] w-full text-black text-[20px] font-bold items-center justify-center flex hover:bg-medium-gray hover:text-white border"
            }
            onClick={() => handleTicketLogin()}
          >
            <span className="ml-0">Log in</span>
          </button>
        </div>
      </div>
    );
  };

  const renderMainLogin = () => {
    return (
      <div className="w-[361px] text-[20px] justify-start items-center flex flex-col">
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
          {/* <WalletIcon className="w-5 h-5 text-white" /> */}
          <img src="/urbit-wallet.svg" className="w-5 h-5" />
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
            onClick={() => setModalType(MODAL_TYPES.MASTER_TICKET)}
          >
            <span className="ml-0">Master Ticket</span>
          </button>
          <button
            className={
              "text-white bg-medium-gray rounded-[10px] h-[36px] w-[230px] text-black text-[20px] font-bold items-center justify-center flex"
            }
            onClick={() => {}}
          >
            <span className="ml-0">Activation Code</span>
          </button>
          <button
            className={
              "text-white bg-medium-gray rounded-[10px] h-[36px] w-[230px] text-black text-[20px] font-bold items-center justify-center flex"
            }
            onClick={() => {}}
          >
            <span className="ml-0">Seed Phrase</span>
          </button>
        </div>
      </div>
    );
  };

  const renderModalContent = () => {
    switch (modalType) {
      case MODAL_TYPES.MAIN:
        return renderMainLogin();
      case MODAL_TYPES.MASTER_TICKET:
        return renderMasterTicketLogin();
      default:
        return renderMainLogin();
    }
  };

  return (
    <Modal
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      isOpen={isOpen}
      onAfterOpen={() => {}}
      onRequestClose={handleClose}
      style={customStyles}
    >
      {renderModalContent()}
    </Modal>
  );
};

export default LoginModal;
