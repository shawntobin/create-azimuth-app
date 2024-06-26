import { useState } from "react";
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

const Ownership = () => {
  const { walletAddress, selectedShip } = useWalletStore();
  const [newOwnerAddress, setNewOwnerAddress] = useState("");
  const {
    gasOptions,
    loading,
    error,
    maxTransactionCost,
    selectedItem,
    handleSelect,
  } = useGasEstimate(GAS_LIMITS.TRANSFER);
  const { patp, owner } = selectedShip;

  // could also check if input address is diff from current owner

  const handleTransfer = async () => {
    try {
      toast.loading("Transfer in progress...");
      const res = await txn.transferPoint(
        walletAddress,
        patp,
        walletAddress,
        newOwnerAddress
      );

      console.log("Transaction result:", res);

      if (res) {
        toast.dismiss();
        toast.success("Transfer successful!");
      } else {
        toast.dismiss();
        toast.error("Transfer failed");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(`${error.message}`);
    }
  };

  return (
    <Container>
      <ControlBox
        headerContent={
          <div className="text-left w-full flex justify-between">
            <div className="items-center justify-center flex text-[20px] ">
              <div className="font-bold">Ownership Address</div>
              <div className="font-[200] ml-3">{formatAddress(owner)}</div>
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
        onSubmit={handleTransfer}
        className="h-[310px]"
        disabled={!isAddress(newOwnerAddress)}
      >
        <div className="justify-start flex flex-col items-start pl-2 border-b border-primary-color mt-2">
          <div className="text-[20px] font-bold pb-10 ">{`Transfer ${patp} to a new owner.`}</div>

          <div className="flex justify-between w-full pr-4 mr-0">
            <div className="text-[20px] text-left ">Gas Fee</div>
            <div className="border-solid border-width-1">
              <Dropdown
                onSelect={handleSelect}
                items={gasOptions}
                focusedItem={selectedItem || gasOptions[1]?.label}
                loading={loading}
                loadingMessage="Loading prices..."
              />
            </div>
          </div>

          <div className="flex justify-between w-full pr-4 mr-0 pt-1">
            <div className="text-[20px] text-left ">Max Transaction Cost</div>
            <div className="border-solid border-width-1 text-[18px]">
              {maxTransactionCost ? `${maxTransactionCost} ETH` : "-"}
            </div>
          </div>

          <div className="text-[20px] mt-[20px] mb-1">Ethereum Address:</div>
        </div>
        <div className="flex h-full items-center">
          <input
            type="text"
            spellCheck="false"
            placeholder="0x..."
            className="pl-4 pr-4 py-0 w-full h-full font-[500] text-[20px] bg-transparent placeholder-secondary-color"
            onChange={(e) => setNewOwnerAddress(e.currentTarget.value)}
            value={newOwnerAddress}
          />
        </div>
      </ControlBox>
    </Container>
  );
};

export default Ownership;
