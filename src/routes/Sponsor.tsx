import { useState } from "react";
import Container from "../components/Container";
import ControlBox from "../components/ControlBox";
import useWalletStore from "../store/useWalletStore";
import toast from "react-hot-toast";
import * as ob from "urbit-ob";
import * as txn from "../utils/transaction";
import useGasEstimate from "../hooks/useGasEstimate";
import Dropdown from "../components/Dropdown";
import { GAS_LIMITS } from "../constants";

const Sponsor = () => {
  const { walletAddress, selectedShip } = useWalletStore();
  const [newSponsorPatp, setNewSponsorPatp] = useState("");
  const {
    gasOptions,
    loading,
    error,
    maxTransactionCost,
    selectedItem,
    handleSelect,
  } = useGasEstimate(GAS_LIMITS.ESCAPE);
  const { patp, sponsor, hasSponsor } = selectedShip;

  const sponsorPatp = hasSponsor ? ob.patp(sponsor) : "None";

  const handleRequestSponsor = async () => {
    const res = await txn.requestNewSponsor(
      walletAddress,
      patp,
      walletAddress,
      newSponsorPatp
    );

    res && toast.success("Transfer successful!");
  };

  return (
    <Container headerText={`Advanced Settings / Change Sponsor`}>
      <ControlBox
        headerContent={
          <div className="text-left w-full flex justify-between">
            <div className="items-center justify-center flex text-[20px] ">
              <div className="font-bold">Sponsor</div>
              <div className="font-[200] ml-3">{sponsorPatp}</div>
            </div>
          </div>
        }
        buttonTitle="Request New Sponsor"
        onSubmit={handleRequestSponsor}
        className="h-[310px]"
        disabled={!ob.isValidPatp(newSponsorPatp)}
      >
        <div className="justify-start flex flex-col items-start pl-2 border-b border-primary-color mt-2">
          <div className="text-[20px] pb-10 font-bold ">{`Some copy about finding a new sponsor here.`}</div>

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

          <div className="text-[20px] mt-[20px] mb-1">New sponsor:</div>
        </div>
        <div className="flex h-full items-center">
          <input
            type="text"
            placeholder="~sampel"
            spellCheck="false"
            className="pl-4 pr-4 py-0 w-full h-full font-[500] text-[20px] bg-transparent placeholder-secondary-color"
            onChange={(e) => setNewSponsorPatp(e.currentTarget.value)}
            value={newSponsorPatp}
          />
        </div>
      </ControlBox>
    </Container>
  );
};

export default Sponsor;
