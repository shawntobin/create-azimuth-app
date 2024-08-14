import { useEffect, useState } from "react";
import Container from "../components/Container";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import ControlBox from "../components/ControlBox";
import useWalletStore from "../store/useWalletStore";
import { formatAddress } from "../utils/address";
import toast from "react-hot-toast";
import * as txn from "../utils/transaction";
import { copy } from "../utils/helper";
import useGasEstimate from "../hooks/useGasEstimate";
import Dropdown from "../components/Dropdown";
import { isAddress } from "web3-validator";
import { GAS_LIMITS } from "../constants";
import useTransaction from "../hooks/useTransaction";
import Checkbox from "../components/Checkbox";
import { INFO_MODAL_TEXT } from "../constants/content";
import { useNavigate } from "react-router-dom";
import { ROUTE_MAP } from "./routeMap";

const Ownership = () => {
  const navigate = useNavigate();
  const { walletAddress, selectedShip, walletType, urbitWallet } =
    useWalletStore();
  const [newOwnerAddress, setNewOwnerAddress] = useState("");
  const { txHash, txnLoading, executeTransaction, txnComplete } =
    useTransaction();
  const [resetKeys, setResetKeys] = useState(false);

  const {
    gasOptions,
    loading,
    error,
    maxTransactionCost,
    selectedGasItem,
    handleSelect,
  } = useGasEstimate(GAS_LIMITS.TRANSFER);
  const { patp, owner } = selectedShip;

  // could also check if input address is diff from current owner
  // how should we display txn hash?
  // repeat button pressing?

  useEffect(() => {
    if (txnComplete) {
      setTimeout(() => {
        navigate(ROUTE_MAP.IDS);
      }, 1000);
    }
  }, [txnComplete]);

  const handleTransaction = async () => {
    const result = await executeTransaction(
      txn.transferPoint,
      walletType,
      patp,
      walletAddress,
      newOwnerAddress,
      urbitWallet,
      selectedGasItem.value,
      resetKeys
    );

    if (result?.success) {
      setNewOwnerAddress("");
    }
  };

  return (
    <Container>
      <ControlBox
        targetRoute={ROUTE_MAP.SETTINGS}
        infoModalText={INFO_MODAL_TEXT.TRANSFER_OWNERSHIP}
        txnHash={txHash}
        txnInProgress={txnLoading}
        headerContent={
          <div className="text-left w-full flex justify-between">
            <div className="items-center justify-center flex text-[20px] ">
              <div className="font-bold">Transfer Ownership</div>
              <div className="font-[200] ml-3">
                <div className="font-[200] ml-3">{formatAddress(owner)}</div>
              </div>
            </div>

            <button
              onClick={() => copy(owner)}
              className="bg-transparent p-0 m-0"
            >
              <DocumentDuplicateIcon className="h-6 w-6" />
            </button>
          </div>
        }
        buttonTitle="Transfer"
        onSubmit={handleTransaction}
        className="h-[500px] w-[500px]"
        disabled={!isAddress(newOwnerAddress)}
      >
        <div className="text-[20px] justify-start flex flex-col items-start px-[20px] h-full mt-2">
          <div className="text-left pb-4 ">{`Transfer ${patp} to a new Ethereum address. This action is irreversible.`}</div>

          <div className="pb-4">
            <Checkbox
              isBold
              label="Clear Keys"
              checked={resetKeys}
              onChange={() => setResetKeys(!resetKeys)}
            />
            <div className="text-[18px] px-8 text-left">
              Select if you want to reset all keys and break all previous
              connections. This is recommended if your Urbit has been previously
              online and is now being transferred to a new owner.
            </div>
          </div>

          <div className="flex justify-between w-full pr-4 mr-0 font-bold">
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

          <div className="flex justify-between w-full pr-4 mr-0 pt-0 font-bold">
            <div className="text-[20px] text-left ">Max Transaction Cost</div>
            <div className="text-[16px] items-end justify-end flex">
              {maxTransactionCost ? `${maxTransactionCost} ETH` : "-"}
            </div>
          </div>

          <div className="text-[20px] mb-1 font-bold">Ethereum Address:</div>
        </div>
        <div className="w-full justify-center items-center flex">
          <div className="flex items-center border w-[455px] rounded-[10px] mb-4">
            <input
              type="text"
              spellCheck="false"
              placeholder="0x..."
              className="pl-4 pr-4 py-0 w-full h-[38px] font-[500] text-[20px] bg-transparent placeholder-secondary-color text-primary-color"
              onChange={(e) => setNewOwnerAddress(e.currentTarget.value)}
              value={newOwnerAddress}
            />
          </div>
        </div>
      </ControlBox>
    </Container>
  );
};

export default Ownership;
