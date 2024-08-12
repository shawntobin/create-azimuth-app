import { useState } from "react";
import Container from "../components/Container";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import ControlBox from "../components/ControlBox";
import useWalletStore from "../store/useWalletStore";
import { formatAddress } from "../utils/address";
import { copy } from "../utils/helper";
import * as txn from "../utils/transaction";
import Dropdown from "../components/Dropdown";
import useGasEstimate from "../hooks/useGasEstimate";
import { isAddress } from "web3-validator";
import { GAS_LIMITS, WALLET_TYPES } from "../constants/constants";
import { isZeroAddress } from "../utils/address";
import { useRefresh } from "../hooks/useRefresh";
import useTransaction from "../hooks/useTransaction";
import { MODAL_TEXT } from "../constants/content";

const ManagementAddress = () => {
  const { walletAddress, selectedShip, walletType, urbitWallet } =
    useWalletStore();
  const [managerAddress, setManagerAddress] = useState("");
  const { txHash, txnLoading, executeTransaction } = useTransaction();
  const {
    gasOptions,
    loading,
    error,
    maxTransactionCost,
    selectedGasItem,
    handleSelect,
  } = useGasEstimate(GAS_LIMITS.SET_PROXY);

  const { patp, managementProxy } = selectedShip;

  const handleTransaction = async () => {
    const result = await executeTransaction(
      txn.changeManagementProxy,
      walletType,
      patp,
      walletAddress,
      managerAddress,
      urbitWallet,
      selectedGasItem.value
    );

    if (result?.success) {
      setManagerAddress("");
    }
  };

  return (
    <Container>
      <ControlBox
        infoModalText={MODAL_TEXT.SET_MANAGEMENT_PROXY}
        txnHash={txHash}
        txnInProgress={txnLoading}
        headerContent={
          <div className="text-left w-full flex justify-between">
            <div className="items-center justify-center flex text-[20px] ">
              <div className="font-bold">Management Proxy</div>
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
        className="h-[360px] w-[500px]"
        disabled={!isAddress(managerAddress)}
      >
        <div className="text-[20px] justify-start flex flex-col items-start px-[20px] h-full mt-2">
          <div className="text-left pb-4 ">{`Setting a management proxy allows you to grant another address control over your network keys and sponsorship settings.`}</div>

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

          <div className="text-[20px] mb-1 font-bold">
            New Management Address:
          </div>
        </div>
        <div className="w-full justify-center items-center flex">
          <div className="flex items-center border w-[455px] rounded-[10px] mb-4">
            <input
              type="text"
              spellCheck="false"
              placeholder="0x..."
              className="pl-4 pr-4 py-0 w-full h-[38px] font-[500] text-[20px] bg-transparent placeholder-secondary-color text-primary-color"
              onChange={(e) => setManagerAddress(e.currentTarget.value)}
              value={managerAddress}
            />
          </div>
        </div>
      </ControlBox>
    </Container>
  );
};

export default ManagementAddress;
