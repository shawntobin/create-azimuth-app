import { useState } from "react";
import toast from "react-hot-toast";
import useLogin from "../hooks/useLogin";
import { urbitWalletFromTicket } from "../lib/wallet";
import * as ob from "urbit-ob";
import Sigil from "../components/Sigil";
import BackButton from "../components/BackButton";
import { PROVIDER_URL, LOGIN_METHODS } from "../constants";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Web3 from "web3";
import { fromWei } from "web3-utils";

const MainLogin = () => {
  const [urbitIdInput, setUrbitIdInput] = useState("");
  const [masterTicket, setMasterTicket] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loginCommon } = useLogin();

  const handleTicketLogin = async () => {
    try {
      const point = ob.patp2dec(urbitIdInput);
      const urbitWallet = await urbitWalletFromTicket(masterTicket, point);
      const walletAddress = urbitWallet.ownership.keys.address;

      const provider = new Web3.providers.HttpProvider(PROVIDER_URL);
      const web3 = new Web3(provider);
      const balanceWei = await web3.eth.getBalance(walletAddress);
      const balanceEth = fromWei(balanceWei, "ether");

      if (urbitWallet) {
        toast.success("Connected using Master Ticket");
        loginCommon(
          walletAddress,
          LOGIN_METHODS.TICKET,
          "",
          balanceEth,
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

  const renderLoginForm = () => {
    return (
      <>
        <div className="text-[20px] mb-2 text-primary-color text-left font-[500]">
          Master Ticket Login
        </div>

        <div className="relative flex items-center mb-3">
          <input
            type="text"
            spellCheck="false"
            placeholder="~sampel-palnet"
            className="pl-4 pr-20 py-2 rounded-full border border-primary-color text-light-gray w-[433px] text-[20px] h-[36px] bg-transparent placeholder-secondary-color"
            onChange={(e) => setUrbitIdInput(e.currentTarget.value)}
            value={urbitIdInput}
          />
          {ob.isValidPatp(urbitIdInput) && (
            <div className="absolute right-0 flex items-center justify-center bg-primary-color border-primary-color rounded-full p-0 h-[36px] w-[36px]">
              <Sigil id={urbitIdInput} size={25} colors={["white", "black"]} />
            </div>
          )}
        </div>

        <div className="relative flex items-center mb-3">
          <input
            type={showPassword ? "text" : "password"}
            spellCheck="false"
            placeholder="~sigtyc-balnyr-nalrus-wolsul"
            className="pl-4 pr-20 py-2 rounded-full border border-primary-color text-light-gray w-[433px] text-[20px] h-[36px] bg-transparent placeholder-secondary-color"
            onChange={(e) => setMasterTicket(e.currentTarget.value)}
            value={masterTicket}
          />

          <button
            className="absolute inset-y-0 right-8 flex items-center justify-center bg-transparent text-primary-color decoration-0 focus:outline-none hover:border-none border-none"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-4 w-4 text-primary-color" />
            ) : (
              <EyeIcon className="h-4 w-4 text-primary-color" />
            )}
          </button>

          <button
            className="text-base-color border-primary-color absolute inset-y-0 right-0 flex items-center justify-center bg-primary-color rounded-full h-[36px] w-[36px] text-[40px] p-2 pt-0 font-[300] focus:outline-none hover:border-light-gray hover:bg-light-gray"
            onClick={() => handleTicketLogin()}
          >
            &gt;
          </button>
        </div>

        <div className="mx-auto w-[433px] mt-2"></div>
      </>
    );
  };

  return (
    <div className="fixed bg-base-color text-primary-color top-0 left-0 h-screen w-screen">
      <div className={`flex flex-col h-full`}>
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="w-[445px] text-left ">
            <BackButton />
          </div>
          {renderLoginForm()}
        </div>
      </div>
    </div>
  );
};

export default MainLogin;
