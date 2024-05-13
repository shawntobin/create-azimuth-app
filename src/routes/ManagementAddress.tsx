import { useState } from "react";
import Container from "../components/Container";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import ControlBox from "../components/ControlBox";
import useWalletStore from "../store/useWalletStore";
import toast from "react-hot-toast";
import { formatAddress } from "../utils";
import { copy } from "../utils/helper";
import * as txn from "../utils/transaction";

const ManagementAddress = () => {
  const { walletAddress, selectedShip } = useWalletStore();
  const [managerAddress, setManagerAddress] = useState("");

  const { patp, managementProxy } = selectedShip;

  const handleTransaction = async () => {
    const res = await txn.setManagementProxy(
      walletAddress,
      patp,
      walletAddress,
      managerAddress
    );

    res && console.log("txn", txn);
    res && toast.success("Transfer successful!");
  };

  return (
    <Container headerText={`Urbit Id / Advanced Settings / Management Address`}>
      <ControlBox
        headerContent={
          <div className="text-left w-full flex justify-between">
            <div className="items-center justify-center flex text-[20px] ">
              <div className="font-bold">Management Address</div>
              <div className="font-[200] ml-3">
                {formatAddress(managementProxy)}
              </div>
            </div>
            <button
              onClick={() => copy(managementProxy)}
              className="bg-transparent p-0 m-0"
            >
              <DocumentDuplicateIcon className="h-6 w-6" />
            </button>
          </div>
        }
        buttonTitle="Set Management Proxy"
        onSubmit={handleTransaction}
        className="h-[319px]"
      >
        <div className="justify-start flex flex-col items-start pl-2 border-b border-light-green h-full">
          <div className="text-[20px] font-bold text-left ">{`Your management key can configure networking settings (network keys and sponsorship).`}</div>
          <div className="text-[20px] mt-[20px] mb-1">New address:</div>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="0x..."
            className="pl-4 pr-4 py-0 w-full h-[39px] font-[500] text-[20px] bg-transparent placeholder-medium-green-2"
            onChange={(e) => setManagerAddress(e.currentTarget.value)}
            value={managerAddress}
          />
        </div>
      </ControlBox>
    </Container>
  );
};

export default ManagementAddress;
