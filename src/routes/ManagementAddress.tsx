import { useState } from "react";
import Container from "../components/Container";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import ControlBox from "../components/ControlBox";
import useWalletStore from "../store/useWalletStore";
import toast from "react-hot-toast";
import { formatAddress } from "../utils/address";
import { copy, calculateMaxTransactionCost } from "../utils/helper";
import * as txn from "../utils/transaction";
import { ETH_ZERO_ADDR } from "../constants/constants";
import Dropdown from "../components/Dropdown";
import useGasEstimate from "../hooks/useGasEstimate";
import { isAddress } from "web3-validator";
import { GAS_LIMITS } from "../constants/constants";
import { isZeroAddress } from "../utils/address";

const ManagementAddress = () => {
  const { walletAddress, selectedShip } = useWalletStore();
  const [managerAddress, setManagerAddress] = useState("");
  const {
    gasOptions,
    loading,
    error,
    maxTransactionCost,
    selectedItem,
    handleSelect,
  } = useGasEstimate(GAS_LIMITS.SET_PROXY);

  const { patp, managementProxy } = selectedShip;

  const handleTransaction = async () => {
    // need to include gas for non-metamask transactions
    const res = await txn.changeManagementProxy(
      walletAddress,
      patp,
      walletAddress,
      managerAddress
    );

    res && toast.success("Transfer successful!");

    // update global state - roller delay ?
    // const updatedShip = await txn.getShip(ob.patp(ids[0]));
    // setSelectedShip(ship);
  };

  return (
    <Container headerText={`Advanced Settings / Management Address`}>
      <ControlBox
        headerContent={
          <div className="text-left w-full flex justify-between">
            <div className="items-center justify-center flex text-[20px] ">
              <div className="font-bold">Management Address</div>
              <div className="font-[200] ml-3">
                {!isZeroAddress(managementProxy)
                  ? formatAddress(managementProxy)
                  : "None"}
              </div>
            </div>
            {!isZeroAddress(managementProxy) && (
              <button
                onClick={() => copy(managementProxy)}
                className="bg-transparent p-0 m-0"
              >
                <DocumentDuplicateIcon className="h-6 w-6" />
              </button>
            )}
          </div>
        }
        buttonTitle="Set Management Proxy"
        onSubmit={handleTransaction}
        className="h-[319px]"
        disabled={!isAddress(managerAddress)}
      >
        <div className="text-[20px] justify-start flex flex-col items-start pl-2 border-b border-primary-color h-full mt-2">
          <div className="font-bold text-left pb-4 ">{`Your management key can configure networking settings (network keys and sponsorship).`}</div>

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

          <div className="text-[20px] mt-[20px] mb-1">
            New Management Address:
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            spellCheck="false"
            placeholder="0x..."
            className="pl-4 pr-4 py-0 w-full h-[39px] font-[500] text-[20px] bg-transparent placeholder-secondary-color text-primary-color"
            onChange={(e) => setManagerAddress(e.currentTarget.value)}
            value={managerAddress}
          />
        </div>
      </ControlBox>
    </Container>
  );
};

export default ManagementAddress;
