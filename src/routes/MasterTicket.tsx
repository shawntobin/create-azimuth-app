import { useState } from "react";
import Container from "../components/Container";
import ControlBox from "../components/ControlBox";
import useWalletStore from "../store/useWalletStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { downloadWallet } from "../lib/invite";
// import PaperBuilder from "components/PaperBuilder";
import { INFO_MODAL_TEXT } from "../constants/content";

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
    return null;
    // <button
    //   onClick={() => setStep(step - 1)}
    //   className="h-[22px] w-[22px] p-0 pb-1 text-[25px] border border-primary-color rounded-[7px] flex items-center justify-center bg-transparent focus:outline-none focus:bg-transparent active:bg-transparent hover:text-secondary-color text-light-gray"
    // >
    //   {`<`}
    // </button>
  };

  const handleDownloadTicket = () => {
    // Download passport
    // downloadWallet(newWallet.value.paper);

    // toast.error("Error downloading passport");

    toast("Passport Download is not available.");

    // console.log("new wallet", newWallet.value.paper);

    // setStep(step + 1);
  };

  const handleVerifyReticket = () => {
    // Verify reticket
    setStep(step + 1);
  };

  const stepOne = () => {
    return (
      <ControlBox
        infoModalText={INFO_MODAL_TEXT.CONVERT_MASTER_TICKET}
        headerContent={
          <div className="text-left w-full flex justify-between text-[20px] font-bold">
            <div className="items-center justify-center flex">
              <span>Convert to Master Ticket</span>
            </div>
            <span>{`Step ${step} of 4`}</span>
          </div>
        }
        buttonTitle="I Understand, Continue"
        onSubmit={() => setStep(step + 1)}
        className="w-[500px] h-[335px]"
      >
        <div className="justify-start flex flex-col items-start p-4 h-full">
          <div className="text-[20px] font-bold text-left ">{`Converting to Master Ticket is the process of generating a completely fresh wallet and transferring ownership of your ID to that wallet.`}</div>
          <div className="text-[20px] mt-[20px] mb-1 text-left">
            Beware, this resets your proxy addresses; if you're using smart
            contracts, this might break them! It will also change your network
            keys. Find out more in the info section above.
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
          isStepBack
          handleStepBack={() => setStep(step - 1)}
          hideInfoButton
          headerContent={
            <div className="text-left w-full flex justify-between text-[20px] font-bold">
              <div className="items-center justify-center flex">
                <span>Convert to Master Ticket</span>
              </div>
              <span>{`Step ${step} of 4`}</span>
            </div>
          }
          buttonTitle="Download Passport ↓"
          onSubmit={handleDownloadTicket}
          // className="h-[250px]"
        >
          <div className="justify-start flex flex-col items-start p-4 h-full">
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
                <span>Convert to Master Ticket</span>
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
                    spellCheck="false"
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
                <span>Convert to Master Ticket</span>
              </div>
              <span>{`Step ${step} of 4`}</span>
            </div>
          }
          buttonTitle=" Login With New Master Ticket"
          onSubmit={() => navigate(`/`)}
        >
          <div className="justify-start flex flex-col items-start pl-2 border-b border-primary-color h-full mt-2">
            <div className="text-[20px] font-bold text-left ">{`Download the new passport, and keep it somewhere safe!`}</div>
            <div className="text-[20px] mt-[20px] mb-1 text-left"></div>
          </div>
        </ControlBox>
      </div>
    );
  };

  return <Container>{renderTicketFlow()}</Container>;
};

export default MasterTicket;
