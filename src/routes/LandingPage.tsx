import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useLogin from "../hooks/useLogin";
import Onboard from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import { PROVIDER_URL, LOGIN_METHODS } from "../constants";
import {
  ETHEREUM_LOCAL_CHAIN_ID,
  ETHEREUM_MAINNET_CHAIN_ID,
  ETHEREUM_SEPOLIA_CHAIN_ID,
} from "../constants";

const LandingPage = () => {
  const navigate = useNavigate();
  const { loginCommon } = useLogin();

  const handleWalletLogin = async () => {
    const injected = injectedModule();

    const onboard = Onboard({
      theme: "dark",
      wallets: [injected],
      chains: [
        {
          id: ETHEREUM_MAINNET_CHAIN_ID,
          token: "ETH",
          label: "Ethereum Mainnet",
          rpcUrl: PROVIDER_URL,
        },
        {
          id: ETHEREUM_SEPOLIA_CHAIN_ID,
          token: "ETH",
          label: "Sepolia Testnet",
          rpcUrl: PROVIDER_URL.replace("mainnet", "sepolia"),
        },
        {
          id: ETHEREUM_LOCAL_CHAIN_ID,
          token: "ETH",
          label: "Local Testnet",
          rpcUrl: PROVIDER_URL,
        },
      ],
      appMetadata: {
        name: "urbit.org",
        description: "Urbit ID Login",
        recommendedInjectedWallets: [
          { name: "MetaMask", url: "https://metamask.io" },
        ],
      },
    });

    try {
      const wallets = await onboard.connectWallet();
      const walletAddress = wallets[0]?.accounts[0]?.address;
      const walletLabel = wallets[0]?.label;
      const walletType = LOGIN_METHODS.BLOCKNATIVE;
      const balance = wallets[0]?.accounts[0]?.balance?.ETH || "0";

      if (walletAddress) {
        await loginCommon(
          walletAddress,
          walletType,
          walletLabel,
          balance,
          null
        );
      } else {
        // user closed the modal
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    }
  };

  const renderContent = () => {
    return (
      <div className="flex flex-col w-[262px] justify-center items-center">
        <div className="text-[32px] font-[700]">Log in</div>
        <div className="text-[16px] pb-8">
          Log in using your web3 wallet, or with a Master Ticket.
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
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-screen flex">
        <div className="w-full bg-black text-white flex flex-col items-center justify-center">
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
