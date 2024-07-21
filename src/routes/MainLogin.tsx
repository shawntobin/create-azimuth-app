import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useLogin from "../hooks/useLogin";
import { urbitWalletFromTicket } from "../lib/wallet";
import * as ob from "urbit-ob";
import Sigil from "../components/Sigil";
import Disclaimer from "../components/Disclaimer";

import Onboard from "@web3-onboard/core";
import walletConnectModule from "@web3-onboard/walletconnect";
import ledgerModule from "@web3-onboard/ledger";
import injectedModule from "@web3-onboard/injected-wallets";
// import { init, useConnectWallet } from "@web3-onboard/react";
import { PROVIDER_URL } from "../constants";
import BackButton from "../components/BackButton";

type LedgerOptionsWCv2 = {
  walletConnectVersion: 2;
  enableDebugLogs?: boolean;
  projectId: string;
  requiredChains?: string[] | number[];
  requiredMethods?: string[];
  optionalMethods?: string[];
  requiredEvents?: string[];
  optionalEvents?: string[];
};

const MainLogin = () => {
  const [urbitIdInput, setUrbitIdInput] = useState("");
  const [masterTicket, setMasterTicket] = useState("");
  const navigate = useNavigate();
  const { loginCommon } = useLogin();

  // try / catch
  // react-hook-form ?

  // const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  // console.log("wallet", wallet);
  // console.log("connecting", connecting);
  // console.log("connect", connect);
  // console.log("disconnect", disconnect);

  const handleWalletLogin = async () => {
    const injected = injectedModule();

    const wcInitOptions = {
      projectId: "26efd74a6781d0fd37fa89e82374db5e",
      requiredChains: [1],
      optionalChains: [11155111], // sepolia
      dappUrl: "https://id.urbit.org",
    };

    const walletConnect = walletConnectModule(wcInitOptions);

    const ledgerOptions: LedgerOptionsWCv2 = {
      ...wcInitOptions,
      walletConnectVersion: 2,
    };

    const ledger = ledgerModule(ledgerOptions);

    const onboard = Onboard({
      theme: "dark",
      wallets: [injected, walletConnect],
      chains: [
        {
          id: "0x1",
          token: "ETH",
          label: "Ethereum Mainnet",
          rpcUrl: PROVIDER_URL,
        },
        {
          id: "0xaa36a7",
          token: "ETH",
          label: "Sepolia Testnet",
          rpcUrl: PROVIDER_URL.replace("mainnet", "sepolia"),
        },
      ],
      appMetadata: {
        name: "id.urbit.org",
        // icon: "../src/assets/urbit-logo2.png",
        description: "Urbit ID Login",
        recommendedInjectedWallets: [
          { name: "MetaMask", url: "https://metamask.io" },
        ],
      },
    });

    try {
      const wallets = await onboard.connectWallet();
      const walletAddress = wallets[0]?.accounts[0]?.address;

      if (walletAddress) {
        await loginCommon(walletAddress);
      } else {
        // user closed the modal
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    }
  };

  const handleTicketLogin = async () => {
    // navigate("/activation");

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

  const renderDisclaimer = () => {
    return <Disclaimer />;
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

              {/* {urbitIdInput && <Sigil id={urbitIdInput} colors={["black", "white"]} size={80} />} */}
            </div>
          )}
        </div>

        <div className="relative flex items-center mb-3">
          <input
            type="text"
            spellCheck="false"
            placeholder="~sigtyc-balnyr-nalrus-wolsul"
            className="pl-4 pr-20 py-2 rounded-full border border-primary-color text-light-gray w-[433px] text-[20px] h-[36px] bg-transparent placeholder-secondary-color"
            onChange={(e) => setMasterTicket(e.currentTarget.value)}
            value={masterTicket}
          />

          <button
            className="text-base-color border-primary-color absolute inset-y-0 right-0 flex items-center justify-center bg-primary-color rounded-full h-[36px] w-[36px] text-[40px] p-2 pt-0 font-[300] focus:outline-none hover:border-light-gray hover:bg-light-gray"
            onClick={() => handleTicketLogin()}
            // disabled
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
