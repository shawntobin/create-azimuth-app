import { useEffect, useState } from "react";
import Container from "../components/Container";
import ControlBox from "../components/ControlBox";
import useWalletStore from "../store/useWalletStore";
import * as ob from "urbit-ob";
import * as txn from "../utils/transaction";
import useGasEstimate from "../hooks/useGasEstimate";
import Dropdown from "../components/Dropdown";
import { GAS_LIMITS } from "../constants";
import useTransaction from "../hooks/useTransaction";
import { formatPatp } from "../utils/helper";
import { MODAL_TEXT } from "../constants/content";
import {
  CheckBadgeIcon,
  CheckIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { getShipStatus } from "../lib/networkEvents";
import BeatLoader from "react-spinners/BeatLoader";
import PulseLoader from "react-spinners/PulseLoader";
import { useNavigate } from "react-router-dom";

const Sponsor = () => {
  const { walletAddress, selectedShip, walletType, urbitWallet } =
    useWalletStore();
  const [newSponsorPatp, setNewSponsorPatp] = useState("");
  const [newSponsorStatus, setNewSponsorStatus] = useState(false);
  const { txHash, txnLoading, executeTransaction, txnComplete } =
    useTransaction();
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const {
    gasOptions,
    loading,
    error,
    maxTransactionCost,
    selectedGasItem,
    handleSelect,
  } = useGasEstimate(GAS_LIMITS.ESCAPE);

  const { patp, sponsor, hasSponsor, escapeRequested, escapeRequestedTo } =
    selectedShip;

  const sponsorPatp = hasSponsor ? ob.patp(sponsor) : "None";

  useEffect(() => {
    const asyncFunction = async () => {
      setLoadingStatus(true);
      const onlineStatus = await getShipStatus(newSponsorPatp);

      setNewSponsorStatus(onlineStatus?.online);
      setLoadingStatus(false);
    };
    console.log("new patp", newSponsorPatp);
    ob.isValidPatp(newSponsorPatp) && asyncFunction();

    // ob.isValidPatp(newSponsorPatp) && asyncFunction();
  }, [newSponsorPatp]);

  useEffect(() => {
    if (txnComplete) {
      setStep(3);
    }
  }, [txnComplete]);

  const renderFlow = () => {
    switch (step) {
      case 1:
        return stepOne();
      case 2:
        return stepTwo();
      case 3:
        return stepThree();
      default:
        return stepOne();
    }
  };

  const renderStatusText = () => {
    if (loadingStatus) {
      return (
        // <span className="pt-0.5">
        //   <PulseLoader
        //     color={"white"}
        //     loading={true}
        //     size={7}
        //     aria-label="Loading Spinner"
        //   />
        // </span>
        null
      );
    } else {
      if (ob.isValidPatp(newSponsorPatp)) {
        if (newSponsorStatus) {
          return (
            <span className="text-[#76E53E]">
              The selected sponsor is online
            </span>
          );
        } else {
          return (
            <span className="text-[#E72E2E]">
              The selected sponsor is offline
            </span>
          );
        }
      }
    }
  };

  const handleTransaction = async () => {
    console.log(
      walletType,
      patp,
      walletAddress,
      newSponsorPatp,
      urbitWallet,
      selectedGasItem.value
    );

    const result = await executeTransaction(
      txn.requestNewSponsor,
      walletType,
      patp,
      walletAddress,
      newSponsorPatp,
      urbitWallet,
      selectedGasItem.value
    );

    // if (result?.success) {
    //   setNewSponsorPatp("");
    // }
  };

  const handleTextChange = (e) => {
    // inputError && setInputError(false);
    const formattedPatp = formatPatp(e.currentTarget.value);
    setNewSponsorPatp(formattedPatp);
  };

  const stepOne = () => {
    return (
      <ControlBox
        infoModalText={MODAL_TEXT.CHANGE_SPONSOR}
        txnHash={txHash}
        txnInProgress={txnLoading}
        headerContent={
          <div className="text-left w-full flex justify-between">
            <div className="items-center justify-center flex text-[20px] ">
              <div className="font-bold">Change Sponsor</div>

              <div className="flex justify-center items-center">
                <div className="font-[200] ml-3">{sponsorPatp}</div>

                {/* {escapeRequested && (
                  <span className="pl-2 text-[16px] text-light-green">{`*pending request to ${ob.patp(
                    escapeRequestedTo
                  )}`}</span>
                )} */}
              </div>
            </div>
            <div className="text-[20px] flex font-bold">
              <span className="pr-1">{`Step ${step}`}</span>
              <span className="text-medium-gray">{` of 3`}</span>
            </div>
          </div>
        }
        buttonTitle="Continue"
        onSubmit={() => setStep(step + 1)}
        className="h-[430px] w-[500px]"
        disabled={!ob.isValidPatp(newSponsorPatp)}
      >
        <div className="text-[20px] justify-start flex flex-col items-start px-[20px] h-full mt-2">
          <div className="h-full">
            <div className="text-left pb-4 font-bold">
              Your star sponsor finds new peers on the network and provides updates. 
              For stable networking performance of your Urbit it is essential that your
              sponsor is online.
            </div>
            <div className="text-left">
              If you're unsure which sponsor to choose, the Urbit Foundation's
              star, ~lapdeg, is consistently online and a reliable option.
            </div>
          </div>
          <div className="flex items-center mb-2 ">
            <span className="text-[20px] font-bold mr-2 items-center flex ">
              New Sponsor:
            </span>
            {renderStatusText()}
          </div>
        </div>
        <div className="w-full justify-center items-center flex">
          <div className="flex items-center border w-[455px] rounded-[10px] mb-4">
            <input
              type="text"
              spellCheck="false"
              placeholder="~lapdeg"
              className="pl-4 pr-4 py-0 w-full h-[38px] font-[500] text-[20px] bg-transparent placeholder-secondary-color text-primary-color"
              onChange={handleTextChange}
              value={newSponsorPatp}
            />
          </div>
        </div>
      </ControlBox>
    );
  };

  const stepTwo = () => {
    return (
      <ControlBox
        isStepBack
        handleStepBack={() => setStep(step - 1)}
        infoModalText={MODAL_TEXT.CHANGE_SPONSOR}
        txnHash={txHash}
        txnInProgress={txnLoading}
        headerContent={
          <div className="text-left w-full flex justify-between">
            <div className="items-center justify-center flex text-[20px] ">
              <div className="font-bold">Change Sponsor</div>

              <div className="flex justify-center items-center">
                <div className="font-[200] ml-3">{sponsorPatp}</div>

                {/* {escapeRequested && (
                <span className="pl-2 text-[16px] text-light-green">{`*pending request to ${ob.patp(
                  escapeRequestedTo
                )}`}</span>
              )} */}
              </div>
            </div>
            <div className="text-[20px] flex font-bold">
              <span className="pr-1">{`Step ${step}`}</span>
              <span className="text-medium-gray">{` of 3`}</span>
            </div>
          </div>
        }
        buttonTitle="Request Sponsorship"
        onSubmit={handleTransaction}
        className="h-[260px] w-[500px]"
        disabled={!ob.isValidPatp(newSponsorPatp)}
      >
        <div className="text-[20px] justify-start flex flex-col items-start px-[20px] h-full mt-2">
          <div className="h-full">
            <div className="text-left pb-4 font-bold">
              {`Sponsorship request for ${newSponsorPatp}.`}
            </div>
          </div>
          <div className="flex justify-between w-full pr-4 mr-0">
            <div className="text-[20px] text-left ">Gas Fee</div>
            <div className="border-solid border-width-1">
              <Dropdown
                height={25}
                fontSize={16}
                onSelect={handleSelect}
                items={gasOptions}
                focusedItem={selectedGasItem.label}
                loading={loading}
                loadingMessage="Loading prices..."
              />
            </div>
          </div>

          <div className="flex justify-between w-full pr-4 mr-0 pt-0 pb-2">
            <div className="text-[20px] text-left ">Max Transaction Cost</div>
            <div className="text-[16px] items-end justify-end flex">
              {maxTransactionCost ? `${maxTransactionCost} ETH` : "-"}
            </div>
          </div>
        </div>
      </ControlBox>
    );
  };
  const stepThree = () => {
    return (
      <ControlBox
        infoModalText={MODAL_TEXT.CHANGE_SPONSOR}
        txnHash={txHash}
        txnInProgress={txnLoading}
        headerContent={
          <div className="text-left w-full flex justify-between">
            <div className="items-center justify-center flex text-[20px] ">
              <div className="font-bold">Change Sponsor</div>
            </div>
            <div className="text-[20px] flex font-bold">
              <span className="pr-1">{`Step ${step}`}</span>
              <span className="text-medium-gray">{` of 3`}</span>
            </div>
          </div>
        }
        buttonTitle="Return Home"
        onSubmit={() => navigate("/manage/advanced")}
        className="h-[280px] w-[500px]"
      >
        <div className="text-[20px] justify-start flex flex-col items-start px-[20px] h-full mt-2">
          <div className="h-full">
            <div className="text-left pb-4 font-bold">
              Your sponsorship request has been submitted successfully.
            </div>
            <div className="text-left">
              The sponsor needs to accept the request before it takes effect. If
              you requested sponsorship from ~lapdeg, please allow up to 24
              hours for this process to complete.
            </div>
          </div>
        </div>
      </ControlBox>
    );
  };

  return <Container>{renderFlow()}</Container>;
};

export default Sponsor;
