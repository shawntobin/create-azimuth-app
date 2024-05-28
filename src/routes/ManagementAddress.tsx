import { useState } from "react";
import Container from "../components/Container";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import ControlBox from "../components/ControlBox";
import useWalletStore from "../store/useWalletStore";
import toast from "react-hot-toast";
import { formatAddress } from "../utils/address";
import { copy } from "../utils/helper";
import * as txn from "../utils/transaction";
import GasDropdown from "../components/GasDropdown";
import { ETH_ZERO_ADDR } from "../constants/constants";

const ManagementAddress = () => {
  const { walletAddress, selectedShip } = useWalletStore();
  const [managerAddress, setManagerAddress] = useState("");

  const { patp, managementProxy } = selectedShip;

  const handleTransaction = async () => {
    const res = await txn.changeManagementProxy(
      walletAddress,
      patp,
      walletAddress,
      managerAddress
    );

    res && toast.success("Transfer successful!");
  };

  return (
    <Container headerText={`Urbit ID / Advanced Settings / Management Address`}>
      <ControlBox
        headerContent={
          <div className="text-left w-full flex justify-between">
            <div className="items-center justify-center flex text-[20px] ">
              <div className="font-bold">Management Address</div>
              <div className="font-[200] ml-3">
                {!ETH_ZERO_ADDR ? formatAddress(managementProxy) : "None"}
              </div>
            </div>
            {!ETH_ZERO_ADDR && (
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
      >
        <div className="text-[20px] justify-start flex flex-col items-start pl-2 border-b border-primary-color h-full">
          <div className="font-bold text-left pb-4 ">{`Your management key can configure networking settings (network keys and sponsorship).`}</div>

          <div className="flex justify-between w-full pr-4 mr-0">
            <div className="text-[20px] text-left ">Gas Fee</div>
            <div className="border-solid border-width-1">
              <GasDropdown />
            </div>
          </div>

          <div className="flex justify-between w-full pr-4 mr-0">
            <div className="text-[20px] text-left ">Max Transaction Cost</div>
            <div className="border-solid border-width-1">0.0029</div>
          </div>

          <div className="text-[20px] mt-[20px] mb-1">
            New Management Address:
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="0x..."
            className="pl-4 pr-4 py-0 w-full h-[39px] font-[500] text-[20px] bg-transparent placeholder-secondary-color"
            onChange={(e) => setManagerAddress(e.currentTarget.value)}
            value={managerAddress}
          />
        </div>
      </ControlBox>
    </Container>
  );
};

export default ManagementAddress;
