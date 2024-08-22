import { useState } from "react";
import Container from "../components/Container";
import ControlBox from "../components/ControlBox";
import useWalletStore from "../store/useWalletStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { downloadWallet } from "../lib/invite";
// import PaperBuilder from "components/PaperBuilder";
import { INFO_MODAL_TEXT } from "../constants/content";
import { ROUTE_MAP } from "./routeMap";

const MasterTicket = () => {
  const { walletAddress, selectedShip } = useWalletStore();
  const [newAddress, setNewAddress] = useState("");
  const [step, setStep] = useState(1);
  const [masterTicketInput, setMasterTicketInput] = useState("");
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
      case 5:
        return stepFive();
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

    // toast("Coming soon!");

    // console.log("new wallet", newWallet.value.paper);

    setStep(step + 1);
  };

  const handleVerifyReticket = () => {
    // Verify reticket
    setStep(step + 1);
  };

  const stepOne = () => {
    return (
      <ControlBox
        targetRoute={ROUTE_MAP.SETTINGS}
        infoModalText={INFO_MODAL_TEXT.CONVERT_MASTER_TICKET}
        headerContent={
          <div className="text-left w-full flex justify-between text-[20px] font-bold">
            <div className="items-center justify-center flex">
              <span>Convert to Master Ticket</span>
            </div>
            <div className="text-[20px] flex font-bold">
              <span className="pr-1">{`Step ${step}`}</span>
              <span className="text-medium-gray">{` of 5`}</span>
            </div>
          </div>
        }
        buttonTitle="I Understand, Continue"
        onSubmit={() => setStep(step + 1)}
        className="w-[500px]"
      >
        <div className="justify-start flex flex-col items-start p-5 h-full">
          <div className="text-[20px] font-bold text-left ">
            Converting to Master Ticket is the process of generating a
            completely fresh wallet and transferring ownership of your ID to
            that wallet.
          </div>
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
              <div className="text-[20px] flex font-bold">
                <span className="pr-1">{`Step ${step}`}</span>
                <span className="text-medium-gray">{` of 5`}</span>
              </div>
            </div>
          }
          buttonTitle="Download Passport ↓"
          onSubmit={handleDownloadTicket}
          // className="h-[250px]"
        >
          <div className="justify-start flex flex-col items-start p-5 h-full">
            <div className="text-[20px] h-[50px] font-bold text-left ">
              Download the new passport, and keep it somewhere safe!
            </div>
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
          isStepBack
          hideInfoButton
          handleStepBack={() => setStep(step - 1)}
          headerContent={
            <div className="text-left w-full flex justify-between text-[20px] font-bold">
              <div className="items-center justify-center flex">
                <span>Convert to Master Ticket</span>
              </div>
              <div className="text-[20px] flex font-bold">
                <span className="pr-1">{`Step ${step}`}</span>
                <span className="text-medium-gray">{` of 5`}</span>
              </div>
            </div>
          }
          buttonTitle="Confirm"
          onSubmit={handleVerifyReticket}
          // className="h-[450px]"
        >
          <div className="justify-start flex flex-col items-start p-5 h-full text-left">
            <div className="text-[20px]">
              Please enter your new Master Ticket, which you can find on your
              passport.
            </div>

            <div className="text-[20px] mt-[50px] mb-2 flex justify-between w-full pr-2">
              <span className="text-[200]">New Master Ticket:</span>
            </div>
            <div className="w-full justify-center items-center flex">
              <div className="flex items-center border w-[455px] rounded-[10px] mb-0">
                <input
                  type="text"
                  spellCheck="false"
                  placeholder={"~sampel-ticlyt-migfun-falmel"}
                  className="px-4 py-0 w-full h-[38px] font-[500] text-[20px] bg-transparent placeholder-secondary-color text-primary-color"
                  onChange={(e) => setMasterTicketInput(e.currentTarget.value)}
                  value={masterTicketInput}
                />
              </div>
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
          targetRoute={ROUTE_MAP.SETTINGS}
          isStepBack
          handleStepBack={() => setStep(step - 1)}
          hideInfoButton
          headerContent={
            <div className="text-left w-full flex justify-between text-[20px] font-bold">
              <div className="items-center justify-center flex">
                <span>Convert to Master Ticket</span>
              </div>
              <div className="text-[20px] flex font-bold">
                <span className="pr-1">{`Step ${step}`}</span>
                <span className="text-medium-gray">{` of 5`}</span>
              </div>
            </div>
          }
          disabled={false}
          buttonTitle="Continue"
          onSubmit={() => setStep(step + 1)}
        >
          <div className="justify-start flex flex-col items-start p-5 h-full mt-2">
            <div className="text-[20px] text-left">
              Please enter your new Master Ticket.
            </div>
            <div className="text-[20px] text-left text-[#E72E2E] py-5">
              Never give your Master Ticket to anyone.
            </div>
            <div className="text-[20px] text-left pb-2">Transferring...</div>

            <div className="w-full bg-transparent border border-primary-color h-3 overflow-hidden">
              <div
                className="bg-primary-color h-3"
                style={{ width: "45%" }}
              ></div>
            </div>
          </div>
        </ControlBox>
      </div>
    );
  };

  const stepFive = () => {
    return (
      <div>
        {renderStepBackButton()}
        <ControlBox
          targetRoute={ROUTE_MAP.SETTINGS}
          handleStepBack={() => setStep(step - 1)}
          isStepBack
          hideInfoButton
          headerContent={
            <div className="text-left w-full flex justify-between text-[20px] font-bold">
              <div className="items-center justify-center flex">
                <span>Convert to Master Ticket</span>
              </div>
              <div className="text-[20px] flex font-bold">
                <span className="pr-1">{`Step ${step}`}</span>
                <span className="text-medium-gray">{` of 5`}</span>
              </div>
            </div>
          }
          buttonTitle=" Login With New Master Ticket"
          onSubmit={() => navigate(`/`)}
        >
          <div className="justify-start flex flex-col items-start p-5 h-full mt-2">
            <div className="text-[20px] font-bold text-left ">
              Conversion complete.
            </div>
            <div className="text-[20px] text-left ">
              Your changes are now reflected on-chain and you can use the new
              ticket to manage your point.
            </div>
            <div className="text-[20px] mt-[20px] mb-1 text-left"></div>
          </div>
        </ControlBox>
      </div>
    );
  };

  return <Container>{renderTicketFlow()}</Container>;
};

export default MasterTicket;
