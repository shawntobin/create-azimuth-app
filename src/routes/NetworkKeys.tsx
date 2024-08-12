import { useEffect, useState } from "react";
import Container from "../components/Container";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import ControlBox from "../components/ControlBox";
import useWalletStore from "../store/useWalletStore";
import toast from "react-hot-toast";
import * as ob from "urbit-ob";
import Checkbox from "../components/Checkbox";
import { MODAL_TEXT } from "../constants/content";
import useGasEstimate from "../hooks/useGasEstimate";
import Dropdown from "../components/Dropdown";
import { GAS_LIMITS } from "../constants";
import { useNavigate } from "react-router-dom";
import * as txn from "../utils/transaction";
import useTransaction from "../hooks/useTransaction";
import { randomHex } from "web3-utils";

const NetworkKeys = () => {
  const { walletAddress, selectedShip, walletType, urbitWallet } =
    useWalletStore();
  const [factoryReset, setFactoryReset] = useState(false);
  const { txHash, txnLoading, executeTransaction, txnComplete } =
    useTransaction();
  const [customSeed, setCustomSeed] = useState(false);
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

  useEffect(() => {
    if (txnComplete) {
      setStep(3);
    }
  }, [txnComplete]);

  const handleTransaction = async () => {
    // walletType: symbol,
    // patp: string,
    // from: string,
    // encryptionKey: string,
    // authenticationKey: string,
    // cryptoSuiteVersion: number,
    // discontinuous: boolean,
    // wallet: UrbitWallet,
    // gasSelection: any,

    const result = await executeTransaction(
      txn.configureNetworkKeys,
      walletType,
      selectedShip.patp,
      walletAddress,
      randomHex(32),
      randomHex(32),
      1,
      factoryReset,
      urbitWallet,
      selectedGasItem.value
    );
  };
  const handleDownloadKeyfile = () => {
    toast("Downloading keyfile is disabled");
  };
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

  const stepOne = () => {
    return (
      <ControlBox
        infoModalText={MODAL_TEXT.SET_NETWORK_KEYS}
        headerContent={
          <div className="text-left w-full flex justify-between">
            <div className="items-center justify-between w-full flex text-[20px] ">
              <div className="font-bold">Set Network Keys</div>

              <div className="text-[20px] flex font-bold">
                <span className="pr-1">{`Step ${step}`}</span>
                <span className="text-medium-gray">{` of 3`}</span>
              </div>
            </div>
          </div>
        }
        buttonTitle="Continue"
        onSubmit={() => setStep(step + 1)}
        className="h-[320px] w-[500px]"
      >
        <div className="text-left pb-4 text-[20px] p-4">
          Network keys are needed to generate a keyfile. You may need to reset
          network keys if X.
        </div>
        <div className="justify-start flex flex-col items-start text-left p-2">
          <div className="pb-4">
            <Checkbox
              isBold
              label="Factory Reset (Optional)"
              checked={factoryReset}
              onChange={() => setFactoryReset(!factoryReset)}
            />
            <div className="text-[20px] px-8 text-[#E72E2E]">
              Select Factory Reset only if your ship is corrupt and you wish to
              erase all of your data and break your connections.
            </div>
          </div>
        </div>
      </ControlBox>
    );
  };

  const stepTwo = () => {
    return (
      <ControlBox
        txnHash={txHash}
        txnInProgress={txnLoading}
        isStepBack
        handleStepBack={() => setStep(step - 1)}
        infoModalText={MODAL_TEXT.SET_NETWORK_KEYS}
        headerContent={
          <div className="text-left w-full flex justify-between">
            <div className="items-center justify-between w-full flex text-[20px] ">
              <div className="font-bold">Set Network Keys</div>

              <div className="text-[20px] flex font-bold">
                <span className="pr-1">{`Step ${step}`}</span>
                <span className="text-medium-gray">{` of 3`}</span>
              </div>
            </div>
          </div>
        }
        buttonTitle="Set Network Keys"
        onSubmit={handleTransaction}
        className="h-[260px] w-[500px]"
      >
        <div className="text-[20px] justify-start flex flex-col items-start px-[20px] h-full mt-2">
          <div className="h-full">
            <div className="text-left pb-4 font-bold">
              {`Reset network keys for ${selectedShip.patp}`}
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
        <div className="justify-start flex flex-col items-start text-left p-2">
          {/* <div>
            <Checkbox
              isBold
              label="Custom Network Seed"
              checked={customSeed}
              onChange={() => setCustomSeed(!customSeed)}
            />
            <div className="text-[20px] pl-8">
              Enter your own custom network seed to derive from
            </div>
          </div> */}
        </div>
      </ControlBox>
    );
  };

  const stepThree = () => {
    return (
      <ControlBox
        infoModalText={MODAL_TEXT.SET_NETWORK_KEYS}
        headerContent={
          <div className="text-left w-full flex justify-between">
            <div className="items-center justify-between w-full flex text-[20px] ">
              <div className="font-bold">Set Network Keys</div>

              <div className="text-[20px] flex font-bold">
                <span className="pr-1">{`Step ${step}`}</span>
                <span className="text-medium-gray">{` of 3`}</span>
              </div>
            </div>
          </div>
        }
        buttonTitle="Download Network Key"
        onSubmit={handleDownloadKeyfile}
        className="h-[360px] w-[500px]"
      >
        <div className="text-[20px] justify-start flex flex-col items-start px-[20px] h-full mt-0">
          <div className="h-full">
            <div className="text-center p-4">
              Copy the contents of the Network Key file and run
              <p className="font-['UrbitSansMono'] w-full">
                <span className="bg-medium-gray w-full">
                  |rekey ‘keyfile_content’
                </span>
              </p>
              using the dojo on your running Urbit
            </div>
            <div className="text-left p-4">
              <b>Important:</b> it may take minutes to hours for the keys to
              become usable. Please be patient, trying to use the new keys
              during this period may result in an invalid keys error.
            </div>
          </div>
        </div>
        <div className="justify-start flex flex-col items-start text-left p-2"></div>
      </ControlBox>
    );
  };

  return <Container>{renderFlow()}</Container>;
};

export default NetworkKeys;
