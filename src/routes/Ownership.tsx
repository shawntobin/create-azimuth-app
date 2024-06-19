import { useState } from "react";
import Container from "../components/Container";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import ControlBox from "../components/ControlBox";
import useWalletStore from "../store/useWalletStore";
import { formatAddress } from "../utils/address";
import toast from "react-hot-toast";
import * as txn from "../utils/transaction";
import { copy } from "../utils/helper";

const Ownership = () => {
  const { walletAddress, selectedShip } = useWalletStore();
  const [newOwnerAddress, setNewOwnerAddress] = useState("");

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
        toast.error("Transfer NOT successful!");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(`Transfer failed: ${error.message}`);
    }
  };

  return (
    <Container headerText={`Advanced Settings / Ownership`}>
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
        className="h-[217px]"
      >
        <div className="justify-start flex flex-col items-start pl-2 border-b border-primary-color mt-2">
          <div className="text-[20px] font-bold ">{`Transfer ${patp} to a new owner.`}</div>
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
