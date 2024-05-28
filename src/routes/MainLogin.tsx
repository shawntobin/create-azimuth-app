import { useEffect, useState } from "react";
import Container from "../components/Container";
import { useNavigate } from "react-router-dom";
import { useSyncProviders } from "../hooks/useSyncProviders";
import toast from "react-hot-toast";
import useLogin from "../hooks/useLogin";
import { urbitWalletFromTicket } from "../lib/wallet";
import * as ob from "urbit-ob";
import UrbitSymbols from "../components/UrbitSymbols";

const MainLogin = () => {
  const [urbitIdInput, setUrbitIdInput] = useState("");
  const [masterTicket, setMasterTicket] = useState("");
  const navigate = useNavigate();
  const providers = useSyncProviders();
  const { loginCommon } = useLogin();

  // try / catch
  // react-hook-form ?
  // metamask SDK react ?

  // clear any existing state

  const handleMetamaskLogin = async () => {
    const providerWithInfo: EIP6963ProviderDetail | undefined = providers.find(
      (provider) => provider.info.name === "MetaMask"
    );

    if (providerWithInfo) {
      const accounts = await providerWithInfo.provider.request({
        method: "eth_requestAccounts",
      });

      if (accounts?.[0]) {
        toast.success("Connected to Metamask");
        await loginCommon(accounts[0]);
      } else {
        toast.error("No accounts found");
      }
    } else {
      toast.error("Provider not found");
    }
  };

  const handleTicketLogin = async () => {
    try {
      const point = ob.patp2dec(urbitIdInput);
      const urbitWallet = await urbitWalletFromTicket(masterTicket, point);
      const walletAddress = urbitWallet.ownership.keys.address;

      if (urbitWallet) {
        toast.success("Connected using Master Ticket");
        loginCommon(walletAddress);
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
          Urbit ID / Log In
        </div>

        <div className="relative flex items-center mb-3">
          <input
            type="text"
            placeholder="~sampel-palnet"
            className="pl-4 pr-20 py-2 rounded-full border border-primary-color text-light-gray w-[433px] text-[20px] h-[36px] bg-transparent placeholder-secondary-color"
            onChange={(e) => setUrbitIdInput(e.currentTarget.value)}
            value={urbitIdInput}
          />

          <button className="absolute inset-y-0 right-0 flex items-center justify-center bg-primary-color border-primary-color rounded-full p-2 h-[36px] w-[36px]">
            <img src="src/assets/sigil-button.png" alt="urbit sigil" />
          </button>
        </div>

        <div className="relative flex items-center mb-3">
          <input
            type="text"
            placeholder="~sigtyc-balnyr-nalrus-wolsul"
            className="pl-4 pr-20 py-2 rounded-full border border-primary-color text-light-gray w-[433px] text-[20px] h-[36px] bg-transparent placeholder-secondary-color"
            onChange={(e) => setMasterTicket(e.currentTarget.value)}
            value={masterTicket}
          />

          <button
            className="text-base-color border-primary-color absolute inset-y-0 right-0 flex items-center justify-center bg-primary-color rounded-full h-[36px] w-[36px] text-[40px] p-2 pt-0 font-[300] focus:outline-none focus:ring-2 focus:ring-primary-color"
            onClick={() => handleTicketLogin()}
          >
            &gt;
          </button>
        </div>

        <div className="mx-auto w-[433px] mt-2">
          <div className="flex flex-row justify-between items-center">
            <button
              className="flex items-center justify-center rounded-full border border-primary-color text-base-color w-[125px] text-[20px] h-[36px] bg-primary-color font-bold"
              onClick={() => handleMetamaskLogin()}
            >
              Metamask
            </button>

            <UrbitSymbols />

            <button
              className="flex items-center justify-center rounded-full border border-primary-color font-bold text-base-color w-[125px] text-[20px] h-[36px] bg-primary-color whitespace-nowrap"
              onClick={() => navigate("/seed-login")}
            >
              Seed phrase
            </button>
          </div>
        </div>
      </>
    );
  };

  return <Container symbols={false}>{renderLoginForm()}</Container>;
};

export default MainLogin;
