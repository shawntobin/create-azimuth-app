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

const SpawnProxy = () => {
  const { walletAddress, selectedShip, walletType, urbitWallet } =
    useWalletStore();
  const [spawnProxyAddress, setSpawnProxyAddress] = useState("");
  const { txHash, txnLoading, executeTransaction } = useTransaction();
  const {
    gasOptions,
    loading,
    error,
    maxTransactionCost,
    selectedGasItem,
    handleSelect,
  } = useGasEstimate(GAS_LIMITS.SET_PROXY);

  const { patp, spawnProxy } = selectedShip;

  const handleTransaction = async () => {
    const result = await executeTransaction(
      txn.changeSpawnProxy,
      walletType,
      patp,
      walletAddress,
      spawnProxyAddress,
      urbitWallet,
      selectedGasItem.value
    );

    if (result?.success) {
      setSpawnProxyAddress("");
    }
  };

  return (
    <Container>
      <ControlBox
        txnHash={txHash}
        txnInProgress={txnLoading}
        headerContent={
          <div className="text-left w-full flex justify-between">
            <div className="items-center justify-center flex text-[20px] ">
              <div className="font-bold">Spawn Proxy</div>
              <div className="font-[200] ml-3">
                {!isZeroAddress(spawnProxy)
                  ? formatAddress(spawnProxy)
                  : "None"}
              </div>
            </div>
            {!isZeroAddress(spawnProxy) && (
              <button
                onClick={() => copy(spawnProxy)}
                className="bg-transparent p-0 m-0"
              >
                <DocumentDuplicateIcon className="h-6 w-6" />
              </button>
            )}
          </div>
        }
        buttonTitle="Set Spawn Proxy"
        onSubmit={handleTransaction}
        className="h-[330px] w-[500px]"
        disabled={!isAddress(spawnProxyAddress)}
      >
        <div className="text-[20px] justify-start flex flex-col items-start px-[20px] h-full mt-2">
          <div className="text-left pb-8 ">{`Your spawn proxy can spawn planets on your behalf.`}</div>

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
              onChange={(e) => setSpawnProxyAddress(e.currentTarget.value)}
              value={spawnProxyAddress}
            />
          </div>
        </div>
      </ControlBox>
    </Container>
  );
};

export default SpawnProxy;
