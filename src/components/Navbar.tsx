import { useEffect, useState } from "react";
import { formatAddress } from "../utils/address";
import useWalletStore from "../store/useWalletStore";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import WalletModal from "./WalletModal";

import toast from "react-hot-toast";
import Onboard from "@web3-onboard/core";
import walletConnectModule from "@web3-onboard/walletconnect";
import injectedModule from "@web3-onboard/injected-wallets";
import { PROVIDER_URL, LOGIN_METHODS } from "../constants";
import useLogin from "../hooks/useLogin";
import { ROUTE_MAP } from "../routes/routeMap";

const Navbar = () => {
  const { walletAddress, ethBalance, clearState, walletLabel } =
    useWalletStore();
  const navigate = useNavigate();
  const { loginCommon } = useLogin();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMetamaskModal, setShowMetamaskModal] = useState(false);

  const renderWalletLogo = () => {
    switch (walletLabel) {
      case "MetaMask":
        return (
          <img
            src="/MetaMask_Fox.svg"
            alt="metamask logo"
            className="w-[25px] h-[25px] mr-3 mb-2"
          />
        );
      case "WalletConnect":
        return (
          <img
            src="/wc.svg"
            alt="WalletConnect logo"
            className="w-[25px] h-[25px] mr-3 mb-2"
          />
        );
      default:
        return (
          <img
            src="/urbit-wallet-black.svg"
            alt="Urbit Wallet logo"
            className="w-[25px] h-[25px] mr-3 mb-2"
          />
        );
        return null;
    }
  };

  // split as separate component
  const renderWalletInfo = () => {
    return (
      <div
        onClick={() => setShowMetamaskModal(true)}
        className="border border-x-black px-3 text-black bg-white h-full mr-[30px] w-[320px] font-bold text-[18px] flex items-center justify-start text-left cursor-pointer"
      >
        {renderWalletLogo()}

        <div className="w-full">
          <div className="text-bold">{formatAddress(walletAddress)}</div>
          <div className="mt-[-5px] text-300 text-[#9C9C9C]">
            {`${Number(ethBalance).toFixed(2) || "0.00"} ETH`}
          </div>
        </div>
        <span className="text-[22.5px] font-bold">↓</span>
      </div>
    );
  };

  const renderLoginButton = () => {
    return (
      <div className="flex items-center justify-end h-full pr-[30px]">
        <button
          className="w-[115px] text-black text-[20px] font-bold flex items-center justify-center bg-white py-1 px-2 border border-x-black h-full"
          onClick={() => setShowLoginModal(true)}
        >
           Log in
        </button>
      </div>
    );
  };

  const handleWalletLogin = async () => {
    setShowLoginModal(false);
    const injected = injectedModule();

    const wcInitOptions = {
      projectId: "26efd74a6781d0fd37fa89e82374db5e",
      requiredChains: [1],
      optionalChains: [11155111], // sepolia
      dappUrl: "https://id.urbit.org",
    };

    const walletConnect = walletConnectModule(wcInitOptions);

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
      const walletLabel = wallets[0]?.label;
      const walletType = LOGIN_METHODS.BLOCKNATIVE;
      const balance = wallets[0]?.accounts[0]?.balance?.ETH;

      console.log(wallets);

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

  const handleSwitchWallet = async () => {
    setShowMetamaskModal(false);
    setShowLoginModal(true);
  };

  const handleLogOut = () => {
    navigate("/");
    clearState();
    setShowLoginModal(false);
    setShowMetamaskModal(false);
  };

  return (
    <>
      <LoginModal
        isOpen={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
        onClick={handleWalletLogin}
      />
      <WalletModal
        isOpen={showMetamaskModal}
        walletAddress={walletAddress}
        walletLabel={walletLabel}
        ethBalance={ethBalance}
        handleClose={() => setShowMetamaskModal(false)}
        handleDisconnect={handleLogOut}
        handleSwitchWallet={handleSwitchWallet}
      />

      <div className="h-[63px] bg-white flex items-center justify-start">
        <div className="w-[300px] bg-black h-full text-white justify-between items-center flex text-[23px] px-4 text-bold">
          <span className="cursor-pointer" onClick={() => navigate("/")}>
            ~&nbsp;&nbsp;&nbsp;Urbit ID
          </span>
          <span className="text-[23px]">↓</span>
        </div>

        <div className="text-black text-[23px] space-x-4 px-4 flex w-full">
          <span>Get Urbit ID</span>
          <span
            className="cursor-pointer"
            onClick={() => navigate(ROUTE_MAP.SIGIL_DESIGNER)}
          >
            Sigil Designer
          </span>
          {walletAddress && (
            <span
              className="cursor-pointer"
              onClick={() => navigate(ROUTE_MAP.MANAGE)}
            >
              Manage ID
            </span>
          )}
        </div>

        {/* {renderLoginButton()} */}
        {walletAddress ? renderWalletInfo() : renderLoginButton()}
        <img
          src="/switch.png"
          alt="switch placeholder"
          className="mr-10 mb-2"
          // w-[64px] h-[41.25px]
          style={{ width: 64, height: 41.25 }}
        />
      </div>
    </>
  );
};

export default Navbar;
