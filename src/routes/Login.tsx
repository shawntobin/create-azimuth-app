import { useState } from "react";
import useWalletStore from "../store/useWalletStore";
import { useSyncProviders } from "../hooks/useSyncProviders";
import toast from "react-hot-toast";
import planetWhite from "../assets/planet-white.png";
import starWhite from "../assets/star-white.png";
import galaxyWhite from "../assets/galaxy-white.png";
import planetGreen from "../assets/planet-green.png";
import starGreen from "../assets/star-green.png";
import galaxyGreen from "../assets/galaxy-green.png";

import Web3 from "web3";

// metamask SDK react ?

import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";

const Login = () => {
  const { selectedWallet, userAccount, setSelectedWallet, setUserAccount } =
    useWalletStore();
  const [showCodeLogin, setShowCodeLogin] = useState(false);

  const providers = useSyncProviders();
  const navigate = useNavigate();

  const renderMainLogin = () => {
    return (
      <>
        <div className="text-5xl mb-4">Urbit Bridge</div>
        <div className="text-xl mb-7">Managing Address space</div>
        <div className="flex flex-row justify-center w-[100%] space-x-10 mb-4">
          <img src={planetGreen} alt="urbit symbols" className="w-25" />
          <img src={starGreen} alt="urbit symbols" className="w-25" />
          <img src={galaxyGreen} alt="urbit symbols" className="w-25" />
        </div>

        <button
          onClick={() => handleConnect(providers[0])}
          className="px-8 py-2.5 rounded-full text-lg bg-[#AAE68C] mt-7 mb-7 border-0 text-black"
        >
          Connect Metamask
        </button>
        <div className="border-b border-[#AAE68C] border-opacity-50 mx-auto"></div>
        <button
          onClick={() => setShowCodeLogin(!showCodeLogin)}
          className="px-8 py-4 rounded-full text-sm bg-[#AAE68C] mt-7 mb-7 border-0 text-black"
        >
          Activation Code / Master Ticket / Recovery Phrase
        </button>
      </>
    );
  };

  const renderCodeLoginForm = () => {
    return (
      <>
        <div className="flex flex-row justify-center w-[100%] space-x-10 mb-6">
          <img src={planetWhite} alt="urbit symbols" className="w-28 h-28" />
          <img src={starWhite} alt="urbit symbols" className="w-28 h-28" />
          <img src={galaxyWhite} alt="urbit symbols" className="w-28 h-28" />
        </div>
        <div className="text-[24px] mb-7 text-white">
          Manage your address space
        </div>
        <div className="text-md mb-2 text-white text-left">
          Master Ticket & Activation Code
        </div>

        <div className="relative flex items-center mb-3">
          <input
            type="text"
            placeholder="~sampel-palnet"
            className="pl-4 pr-20 py-2 rounded-full border-2 border-white w-full text-black"
          />

          <button className="text-black absolute inset-y-0 right-0 flex items-center justify-center bg-[#AAE68C] rounded-full p-2 h-11 w-11">
            <img
              src="src/assets/sigil-button.png"
              alt="urbit symbols"
              style={{ width: 300 }}
            />
          </button>
        </div>

        <div className="relative flex items-center mb-3">
          <input
            type="text"
            placeholder="Master Ticket / Activation Code"
            className="pl-4 pr-20 py-2 rounded-full border-2 border-white w-full text-black"
          />

          <button className="text-black absolute inset-y-0 right-0 flex items-center justify-center bg-[#AAE68C] rounded-full p-2 h-11 w-11">
            &gt;
          </button>
        </div>

        <div className="text-center my-4">
          <span className="text-white text-base mb-2 inline-block">or</span>
          <div className="border-b border-white border-opacity-50 mx-auto"></div>
        </div>

        <div className="w-full">
          <div className="text-md mb-2 mt-6 text-white text-left">
            Seed Phrase
          </div>

          <div className="flex items-center bg-white rounded-lg overflow-hidden h-[75px]">
            <textarea
              placeholder="example crew supreme gesture quantum web media hazard theory mercy wing kitten"
              className="flex-1 px-4 py-2 bg-transparent outline-none text-black text-sm resize-none"
              rows={3}
            ></textarea>

            <button className="bg-[#AAE68C] px-4 py-2 rounded-r-lg h-[100%] font-bold text-black">
              &gt;
            </button>
          </div>
        </div>
      </>
    );
  };

  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      const accounts = await providerWithInfo.provider.request({
        method: "eth_requestAccounts",
      });

      if (accounts?.[0]) {
        // setSelectedWallet(providerWithInfo);
        setUserAccount(accounts[0]);

        const provider = new Web3.providers.HttpProvider(c.INFURA_URL);
        const web3 = new Web3(provider);
        const contracts = await initContractsPartial(web3, c.CONTRACT.azimuth);

        toast.success("Connected to Metamask");

        // navigate to next screen -> could be single ship or multiple ships
        // navigate("/wallet");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-[#141A13] text-[#AAE68B] flex justify-center items-center flex-col font-mono">
      <div className="w-1/3">
        {showCodeLogin ? renderCodeLoginForm() : renderMainLogin()}
      </div>
    </div>
  );
};

export default Login;
