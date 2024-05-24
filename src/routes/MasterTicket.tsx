import { useState } from "react";
import Container from "../components/Container";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import ControlBox from "../components/ControlBox";
import useWalletStore from "../store/useWalletStore";
import toast from "react-hot-toast";
import { copy } from "../utils/helper";
import { ecliptic, azimuth, initContractsPartial } from "azimuth-js";
import { changeManagementProxy } from "../utils/transactionL2";
import Web3 from "web3";
import { PROVIDER_URL } from "../constants";
import { CONTRACT } from "../constants/contracts";
import { useNavigate } from "react-router-dom";
import { downloadWallet } from "../lib/invite";

const MasterTicket = () => {
  const { walletAddress, selectedShip } = useWalletStore();
  const [newAddress, setNewAddress] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const { managementProxy, layer } = selectedShip;

  const renderTicketFlow = () => {
    switch (step) {
      case 1:
        return stepOne();
      case 2:
        return stepTwo();
      case 3:
        return stepThree();
      case 4:
        return stepFour();
      default:
        return stepOne();
    }
  };

  const renderStepBackButton = () => {
    return (
      <button
        onClick={() => setStep(step - 1)}
        className="text-[40px] flex items-center justify-center bg-transparent border-none p-2 focus:outline-none focus:bg-transparent active:bg-transparent"
      >
        {`<`}
      </button>
    );
  };

  const handleDownloadTicket = () => {
    // Download passport
    downloadWallet(newWallet.value.paper);
    setStep(step + 1);
  };

  const handleVerifyReticket = () => {
    // Verify reticket
    setStep(step + 1);
  };

  const stepOne = () => {
    return (
      <ControlBox
        headerContent={
          <div className="text-left w-full flex justify-between text-[20px] font-bold">
            <div className="items-center justify-center flex">
              <span>Transfer Master Ticket</span>
            </div>
            <span>{`Step ${step} of 4`}</span>
          </div>
        }
        buttonTitle="I Understand, Continue"
        onSubmit={() => setStep(step + 1)}
        // className="h-[250px]"
      >
        <div className="justify-start flex flex-col items-start pl-2 border-b border-primary-color h-full">
          <div className="text-[20px] font-bold text-left ">{`Reticketing is the process of generating a completely fresh wallet and transferring ownership of your point to that wallet.`}</div>
          <div className="text-[20px] mt-[20px] mb-1 text-left">
            Beware, this resets your proxy addresses; if you're using smart
            contracts, this might break them! It will also change your
            networking keys!
          </div>
        </div>
      </ControlBox>
    );
  };

  const stepTwo = () => {
    return (
      <div>
        {renderStepBackButton()}
        <ControlBox
          hideBackButton
          headerContent={
            <div className="text-left w-full flex justify-between text-[20px] font-bold">
              <div className="items-center justify-center flex">
                <span>Transfer Master Ticket</span>
              </div>
              <span>{`Step ${step} of 4`}</span>
            </div>
          }
          buttonTitle="Download Passport"
          onSubmit={handleDownloadTicket}
          // className="h-[250px]"
        >
          <div className="justify-start flex flex-col items-start pl-2 border-b border-primary-color h-full">
            <div className="text-[20px] h-[50px] font-bold text-left ">{`Download the new passport, and keep it somewhere safe!`}</div>
          </div>
        </ControlBox>
      </div>
    );
  };

  const stepThree = () => {
    return (
      <div>
        {renderStepBackButton()}
        <ControlBox
          hideBackButton
          headerContent={
            <div className="text-left w-full flex justify-between text-[20px] font-bold">
              <div className="items-center justify-center flex">
                <span>Transfer Master Ticket</span>
              </div>
              <span>{`Step ${step} of 4`}</span>
            </div>
          }
          buttonTitle="Continue"
          onSubmit={handleVerifyReticket}
          // className="h-[250px]"
        >
          <div className="justify-between flex flex-col items-start pl-2 border-b border-primary-color h-full">
            <div className="text-[20px] font-bold ">{`Verify New Master Ticket`}</div>

            <div className="text-[20px] mt-[20px] mb-1 flex justify-between w-full pr-2">
              <span className="text-[200]">{"New Master Ticket:"}</span>

              <span className="flex items-center justify-center">
                <span>Show:</span>
                <div className="relative ml-2">
                  <input
                    type="checkbox"
                    id="customCheckbox"
                    className="opacity-0 absolute h-4 w-4 "
                  />
                  <label
                    htmlFor="customCheckbox"
                    className="flex items-center cursor-pointer"
                  >
                    <span className="block w-4 h-4 bg-black border border-primary-color rounded-sm"></span>
                  </label>
                </div>
              </span>
            </div>
          </div>
        </ControlBox>
      </div>
    );
  };

  const stepFour = () => {
    return (
      <div>
        {renderStepBackButton()}
        <ControlBox
          hideBackButton
          headerContent={
            <div className="text-left w-full flex justify-between text-[20px] font-bold">
              <div className="items-center justify-center flex">
                <span>Transfer Master Ticket</span>
              </div>
              <span>{`Step ${step} of 4`}</span>
            </div>
          }
          buttonTitle="Login With New Master Ticket"
          onSubmit={() => navigate(`/`)}
          // className="h-[250px]"
        >
          <div className="justify-start flex flex-col items-start pl-2 border-b border-primary-color h-full">
            <div className="text-[20px] font-bold text-left ">{`Download the new passport, and keep it somewhere safe!`}</div>
            <div className="text-[20px] mt-[20px] mb-1 text-left"></div>
          </div>
        </ControlBox>
      </div>
    );
  };

  return (
    <Container headerText={`Urbit Id / Advanced Settings / Master Ticket`}>
      {renderTicketFlow()}
    </Container>
  );
};

export default MasterTicket;
