import { useState } from "react";
import Container from "../components/Container";
import { DocumentDuplicateIcon, EyeIcon } from "@heroicons/react/24/outline";
import ControlBox from "../components/ControlBox";
import useWalletStore from "../store/useWalletStore";
import { useNavigate } from "react-router-dom";
import Sigil from "../components/Sigil";

import { ReactComponent as SecretShapeOne } from "../assets/secret-input-1.svg";
import { ReactComponent as SecretShapeTwo } from "../assets/secret-input-2.svg";
import { ReactComponent as SecretShapeThree } from "../assets/secret-input-3.svg";
import { ReactComponent as SecretShapeFour } from "../assets/secret-input-4.svg";

const Activation = () => {
  const { walletAddress } = useWalletStore();
  const [step, setStep] = useState(1);
  const [verifyError, setVerifyError] = useState(true);
  const navigate = useNavigate();

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

    setStep(step + 1);
  };

  const handleVerifyReticket = () => {
    // Verify reticket
    setStep(step + 1);
  };

  const stepOne = () => {
    return (
      <ControlBox
        buttonTitle="Claim"
        onSubmit={() => setStep(step + 1)}
        className="w-[500px]"
      >
        <div className="justify-start flex flex-col items-start p-4 pr-10 h-full">
          <div className="text-[20px] text-left ">{`An Urbit ID is your unique identity that you use to communicate on Urbit. You own it forever.`}</div>
          <div className="text-[20px] mt-[20px] mb-1 text-left">
            To activate your Urbit ID begin by claiming it via the link below.
          </div>

          <div className="w-full flex flex-col items-center justify-center my-8">
            <div className="m-[10px] rounded-[13px] overflow-hidden w-[143px] h-[143px] border justify-center items-center flex">
              <Sigil
                id={"~hastux-dibtux"}
                colors={["black", "white"]}
                size={110}
              />
            </div>
            <div className="text-center text-white text-med mt-0 text-[20px] font-bold">
              {"~hastux-dibtux"}
            </div>
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
          hideInfoButton
          buttonTitle={
            <div className="flex w-full items-center justify-center">
              <EyeIcon className="h-7 w-7 mr-2" />
              Reveal
            </div>
          }
          onSubmit={handleDownloadTicket}
          className="h-[350px]"
        >
          <div className="justify-start flex flex-col items-center p-4 h-full w-full">
            <div className="text-[20px] h-[50px] font-bold">{`This is your Master Ticket.`}</div>
            <div className="text-[20px] text-left">{`Your Master Ticket is your 4-word password for your Urbit ID. If your Master Ticket is compromised, your Urbit ID is compromised. Before you reveal it, make sure you're somewhere private.`}</div>

            <span className="mt-5 flex justify-between w-full items-center">
              <div>
                <SecretShapeOne className="w-full h-full" />
              </div>
              <div>
                <SecretShapeTwo className="w-full h-full" />
              </div>
              <div>
                <SecretShapeThree className="w-full h-full" />
              </div>
              <div>
                <SecretShapeFour className="w-full h-full" />
              </div>
            </span>
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
          hideInfoButton
          buttonTitle="Download Back Up (Passport)"
          onSubmit={handleVerifyReticket}
          className="h-[410px]"
        >
          <div className="justify-between flex flex-col items-start p-0 h-full">
            <div className="p-8">
              <div className="text-[20px] font-bold pb-4 ">{`Back up your Master Ticket`}</div>
              <div className="text-[16px] text-[#C1C1C1]">{`Download and store your backup somewhere safe, like a security deposit box or password manager.`}</div>

              <div className="w-full flex items-center justify-center m-3">
                <div className="text-[20px] text-center items-center flex border border-[#FF0000] px-4 py-1 mt-4 rounded-[5px] text-[#E72E2E] font-bold bg-transparent">{`Never share your master ticket with anyone.`}</div>
              </div>
            </div>

            <div className="flex items-center justify-center mt-0 w-full">
              <div className="border border-[white] bg-[#2B2B29] rounded-[5px] h-[45px] w-[84px] flex justify-center items-center">
                hastuc
              </div>
              <div className="border w-[23px]" />
              <div className="border border-[white] bg-[#2B2B29] rounded-[5px] h-[45px] w-[84px] flex justify-center items-center">
                hastuc
              </div>
              <div className="border w-[23px]" />
              <div className="border border-[white] bg-[#2B2B29] rounded-[5px] h-[45px] w-[84px] flex justify-center items-center">
                hastuc
              </div>
              <div className="border w-[23px]" />
              <div className="border border-[white] bg-[#2B2B29] rounded-[5px] h-[45px] w-[84px] flex justify-center items-center">
                hastuc
              </div>
            </div>

            <div className="text-[16px] mt-[20px] mb-1 flex justify-center items-center w-full mb-3">
              <button
                className="flex underline decoration-1 items-center justify-center text-primary-color text-[20px] bg-transparent p-0 m-0"
                onClick={() => {}}
              >
                <DocumentDuplicateIcon className="h-6 w-6 pr-1" />
                Copy
              </button>
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
          hideInfoButton
          buttonTitle="Confirm Backup"
          onSubmit={() => setStep(step + 1)}
        >
          <div className="justify-start flex flex-col items-start pl-2 h-full mt-2">
            <div className="text-[20px] font-bold text-left px-4 ">{`Confirm Backup`}</div>
            <div className="text-[20px] text-left p-4 ">{`To confirm that you stored your Master Ticket somewhere safe, enter it below.`}</div>
            <div className=" my-10 my-10  w-full px-10">
              {verifyError && (
                <div className="text-[#E72E2E] justify-start items-start flex font-[20px] pb-4">
                  Incorrect Master Ticket.
                </div>
              )}

              <div className="flex items-center justify-center">
                <input className="border border-[white] bg-transparent rounded-[5px] h-[45px] w-[84px] flex justify-center items-center text-center" />
                <div className="border w-[23px]" />
                <input className="border border-[white] bg-transparent rounded-[5px] h-[45px] w-[84px] flex justify-center items-center text-center" />
                <div className="border w-[23px]" />
                <input className="border border-[white] bg-transparent rounded-[5px] h-[45px] w-[84px] flex justify-center items-center text-center" />
                <div className="border w-[23px]" />
                <input className="border border-[white] bg-transparent rounded-[5px] h-[45px] w-[84px] flex justify-center items-center text-center" />
              </div>
              <div className="text-[20px] mt-[20px] mb-1 text-left"></div>
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
          hideBackButton
          hideInfoButton
          buttonColor="bg-bright-green"
          buttonTitle="Set up planet"
          onSubmit={() => navigate(`/manage/set-up`)}
        >
          <div className="justify-start flex flex-col items-start pl-2 h-full mt-2">
            <div className="text-[20px] font-bold text-left p-4 ">{`Congratulations,`}</div>

            <div className="text-[20px] text-left p-4 flex">
              <div className="font-bold mr-2">{`~hastuc-bindux`}</div>
              <div>is now yours.</div>
            </div>

            <div className="w-full flex flex-col items-center justify-center my-6">
              <div className="shadow-custom-green m-[10px] rounded-[13px] overflow-hidden w-[143px] h-[143px] border justify-center items-center flex">
                <Sigil
                  id={"~hastux-dibtux"}
                  colors={["black", "white"]}
                  size={110}
                />
              </div>
              <div className="text-center text-white text-med mt-0 text-[20px] font-bold">
                {"~hastux-dibtux"}
              </div>
            </div>

            <div className="text-[20px] mt-[20px] mb-1 text-left"></div>
          </div>
        </ControlBox>
      </div>
    );
  };

  return (
    <Container hideHistory dropdown={false}>
      {renderTicketFlow()}
    </Container>
  );
};

export default Activation;
