import { useState } from "react";
import { formatAddress } from "../utils/address";
import useWalletStore from "../store/useWalletStore";
import { useNavigate } from "react-router-dom";
import WalletModal from "./WalletModal";

const Navbar = () => {
  const { walletAddress, ethBalance, clearState, walletLabel } =
    useWalletStore();
  const navigate = useNavigate();

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

  const handleLogOut = () => {
    navigate("/");
    clearState();
    setShowMetamaskModal(false);
  };

  return (
    <>
      <WalletModal
        isOpen={showMetamaskModal}
        walletAddress={walletAddress}
        walletLabel={walletLabel}
        ethBalance={ethBalance}
        handleClose={() => setShowMetamaskModal(false)}
        handleDisconnect={handleLogOut}
      />

      <div className="h-[63px] bg-white flex items-center justify-start">
        <div className="bg-white h-full text-black justify-between items-center flex text-[23px] px-4 text-bold">
          <span className="cursor-pointer" onClick={() => navigate("/")}>
            ~&nbsp;&nbsp;&nbsp;Azimuth
          </span>
        </div>

        <div className="text-black text-[23px] space-x-4 px-4 flex w-full" />

        {walletAddress && renderWalletInfo()}
      </div>
    </>
  );
};

export default Navbar;
