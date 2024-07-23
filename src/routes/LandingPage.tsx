import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useLogin from "../hooks/useLogin";
// import Disclaimer from "../components/Disclaimer";

import Onboard from "@web3-onboard/core";
import walletConnectModule from "@web3-onboard/walletconnect";
import ledgerModule from "@web3-onboard/ledger";
import injectedModule from "@web3-onboard/injected-wallets";
// import { init, useConnectWallet } from "@web3-onboard/react";
import { PROVIDER_URL } from "../constants";

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

const LandingPage = () => {
  const navigate = useNavigate();
  const { loginCommon } = useLogin();

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

  const renderLeftContent = () => {
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="text-[32px] font-[700]">Welcome to Urbit ID</div>
        <div className="text-[16px]  w-[320px] pb-8">
          Don't have an Urbit ID or just looking to explore? Use the tools below
          to find, buy, or customize an Urbit ID.
        </div>
        <div className="flex space-x-4">
          <div className="text-[black]">
            <div className="flex flex-col w-[136px] h-[250px] rounded-[18px] border border-black">
              <div className="border-b border-black text-left pl-4 font-[500] text-[16px]">
                Star Scanner
              </div>

              <img
                src="/sigils.png"
                alt="star scanner"
                className="w-full h-[150px] object-cover border-b border-black"
              />

              <div className="h-[120px] mb-0 text-left w-full flex justify-between px-3 py-1 border-b border-primary-color text-[12px] font-[400]">
                Search stars and find planets that can be spawned from them.
              </div>
              <button
                style={{
                  marginBottom: "-1px",
                  marginLeft: "-1px",
                  marginRight: "-1px",
                }}
                className="mt-auto p-0 m-0 rounded-b-[18px] h-[38px] text-white bg-black text-[20px] font-[500] font-bold hover:bg-light-gray hover:text-black hover:border-light-gray"
                onClick={() => navigate("/star-scanner")}
              >
                Open
              </button>
            </div>
          </div>
          {/* dfefwefe */}
          <div className="text-[black]">
            <div className="flex flex-col w-[136px] h-[250px] rounded-[18px] border border-black">
              <div className="border-b border-black text-left pl-4 font-[500] text-[16px]">
                Buy Urbit ID
              </div>
              <img
                src="/opensea-logo.png"
                alt="star scanner"
                className="w-full h-[150px] object-cover border-b border-black"
              />
              <div className="h-[120px]  mb-0 text-left w-full flex justify-between px-3 py-1 border-b border-primary-color text-[12px] font-[400]">
                Navigate to OpenSea to buy Planets, Stars or Galaxies.
              </div>

              <a
                href="https://opensea.io/collection/urbit-id-planet"
                target="_blank"
                style={{
                  marginBottom: "-1px",
                  marginLeft: "-1px",
                  marginRight: "-1px",
                }}
                className="mt-auto p-0 m-0 rounded-b-[18px] h-[38px] text-white bg-black text-[20px] font-[500] font-bold hover:bg-light-gray hover:text-black hover:border-light-gray"
              >
                Open
              </a>
            </div>
          </div>
          {/* dfwfqfw */}
          <div className="text-[black]">
            <div className="flex flex-col w-[136px] h-[250px] rounded-[18px] border border-black">
              <div className="border-b border-black text-left pl-4 font-[500] text-[16px]">
                Sigil Generator
              </div>
              <img
                src="/sigil-sample.png"
                alt="star scanner"
                className="w-full h-[150px] object-cover border-b border-black"
              />
              <div className="h-[120px]  mb-0 text-left w-full flex justify-between px-3 py-1 border-b border-primary-color text-[12px] font-[400]">
                Customize your sigil colors and download an image.
              </div>
              <button
                style={{
                  marginBottom: "-1px",
                  marginLeft: "-1px",
                  marginRight: "-1px",
                }}
                className="mt-auto p-0 m-0 rounded-b-[18px] h-[38px] text-white bg-black text-[20px] font-[500] font-bold hover:bg-light-gray hover:text-black hover:border-light-gray"
                onClick={() => navigate("/sigil-generator")}
              >
                Open
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const renderRightContent = () => {
    return (
      <div className="flex flex-col w-[262px] justify-center items-center">
        <div className="text-[32px] font-[700]">Log in</div>
        <div className="text-[16px] pb-8">
          Log in with any method below to receive, send, and manage your Urbit
          ID.
        </div>
        <button
          className="mb-8 w-[216px] flex items-center justify-center rounded-full border border-primary-color font-bold text-base-color text-[20px] h-[36px] bg-primary-color whitespace-nowrap hover:border-light-gray hover:bg-light-gray"
          onClick={handleWalletLogin}
        >
          Connect Wallet
        </button>

        <div className="border-b border-primary-color w-[210px] mb-8" />

        <div className="flex flex-col space-y-2 w-full items-center">
          <button
            className="flex items-center justify-center rounded-full border border-primary-color font-bold text-base-color text-[20px] h-[36px] bg-primary-color whitespace-nowrap hover:border-light-gray hover:bg-light-gray"
            onClick={() => navigate("/ticket-login")}
          >
            Master Ticket
          </button>

          <button
            className="flex items-center justify-center rounded-full border border-primary-color font-bold text-base-color text-[20px] h-[36px] bg-primary-color whitespace-nowrap hover:border-light-gray hover:bg-light-gray"
            onClick={() => navigate("/activation")}
          >
            Activation Code
          </button>

          <button
            className="flex items-center justify-center rounded-full border border-primary-color font-bold text-base-color text-[20px] h-[36px] bg-primary-color whitespace-nowrap hover:border-light-gray hover:bg-light-gray"
            onClick={() => navigate("/seed-login")}
          >
            Seed phrase
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex">
      <div className="w-1/2 bg-white text-black flex flex-col items-center justify-center">
        {renderLeftContent()}
      </div>
      <div className="w-1/2 bg-black text-white flex flex-col items-center justify-center">
        {renderRightContent()}
      </div>
    </div>
  );
};

export default LandingPage;
