import { useEffect, useState } from "react";
import useWalletStore from "../store/useWalletStore";
import { useSyncProviders } from "../hooks/useSyncProviders";
import toast from "react-hot-toast";
import planetGreen from "../assets/planet-green.png";
import starGreen from "../assets/star-green.png";
import galaxyGreen from "../assets/galaxy-green.png";
import { getPoints } from "../utils/azimuth";
import Container from "../components/Container";
import Button from "../components/Button";
import * as azimuth from "azimuth-js";
import Web3 from "web3";
import * as c from "../constants";
import { useNavigate } from "react-router-dom";

// metamask SDK react ?

const Login = () => {
  const { setWalletAddress, setUrbitIds } = useWalletStore();
  const navigate = useNavigate();
  const providers = useSyncProviders();

  // try / catch

  const metamaskProvider = providers.find(
    (provider) => provider.info.name === "MetaMask"
  );

  console.log("metamask provider", metamaskProvider);

  const renderMainLogin = () => {
    return (
      <>
        <div className="text-5xl mb-4 font-bold">Urbit Bridge</div>
        <div className="text-xl mb-7">Managing Address space</div>
        <div className="flex flex-row justify-center w-[100%] space-x-10 mb-4">
          <img src={planetGreen} alt="urbit planet symbol" />
          <img src={starGreen} alt="urbit star symbol" />
          <img src={galaxyGreen} alt="urbit galaxy symbol" />
        </div>

        <Button
          handleClick={() => handleConnect(metamaskProvider)}
          text="Connect Metamask"
          className="mt-7 mb-7 w-[274px] h-[53px] text-[1.25rem]"
        />

        <div className="border-b border-b-1 border-light-green border-opacity-50 mx-auto w-80" />

        <Button
          handleClick={() => navigate(`/code-login`)}
          text="Activation Code / Master Ticket / Recovery Phrase"
          className="mt-7 mb-7 w-[400px] h-[53px]"
        />
      </>
    );
  };

  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      const accounts = await providerWithInfo.provider.request({
        method: "eth_requestAccounts",
      });

      if (accounts?.[0]) {
        toast.success("Connected to Metamask");

        const urbitIds = await getPoints(accounts[0]);

        setWalletAddress(accounts[0]);
        setUrbitIds(urbitIds);

        // Case when no IDs?

        // single urbit Id - go to manage
        if (urbitIds.length === 1) {
          navigate(`/manage`);
        } else {
          // multiple urbit Ids - go to wallet view
          navigate(`/wallet`);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return <Container>{renderMainLogin()}</Container>;
};

export default Login;
