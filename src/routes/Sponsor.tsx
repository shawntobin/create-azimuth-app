import { useState } from "react";
import Container from "../components/Container";
import ControlBox from "../components/ControlBox";
import useWalletStore from "../store/useWalletStore";
import * as ob from "urbit-ob";
import * as txn from "../utils/transaction";
import useGasEstimate from "../hooks/useGasEstimate";
import Dropdown from "../components/Dropdown";
import { GAS_LIMITS } from "../constants";
import useTransaction from "../hooks/useTransaction";
import { formatPatp } from "../utils/helper";
import { MODAL_TEXT } from "../constants/content";

const Sponsor = () => {
  const { walletAddress, selectedShip, walletType, urbitWallet } =
    useWalletStore();
  const [newSponsorPatp, setNewSponsorPatp] = useState("");
  const { txHash, txnLoading, executeTransaction } = useTransaction();
  const {
    gasOptions,
    loading,
    error,
    maxTransactionCost,
    selectedGasItem,
    handleSelect,
  } = useGasEstimate(GAS_LIMITS.ESCAPE);
  const { patp, sponsor, hasSponsor, escapeRequested, escapeRequestedTo } =
    selectedShip;

  const sponsorPatp = hasSponsor ? ob.patp(sponsor) : "None";

  const handleTransaction = async () => {
    const result = await executeTransaction(
      txn.requestNewSponsor,
      walletType,
      patp,
      walletAddress,
      newSponsorPatp,
      urbitWallet,
      selectedGasItem.value
    );

    if (result?.success) {
      setNewSponsorPatp("");
    }
  };

  const handleTextChange = (e) => {
    // inputError && setInputError(false);
    const formattedPatp = formatPatp(e.currentTarget.value);
    setNewSponsorPatp(formattedPatp);
  };

  return (
    <Container>
      <ControlBox
        infoModalText={MODAL_TEXT.CHANGE_SPONSOR}
        txnHash={txHash}
        txnInProgress={txnLoading}
        headerContent={
          <div className="text-left w-full flex justify-between">
            <div className="items-center justify-center flex text-[20px] ">
              <div className="font-bold">Sponsor</div>

              <div className="flex w-full justify-center items-center">
                <div className="font-[200] ml-3">{sponsorPatp}</div>

                {escapeRequested && (
                  <span className="pl-2 text-[16px] text-light-green">{`*pending request to ${ob.patp(
                    escapeRequestedTo
                  )}`}</span>
                )}
              </div>
            </div>
          </div>
        }
        buttonTitle="Request New Sponsor"
        onSubmit={handleTransaction}
        className="h-[360px] w-[500px]"
        disabled={!ob.isValidPatp(newSponsorPatp)}
      >
        <div className="text-[20px] justify-start flex flex-col items-start px-[20px] h-full mt-2">
          <div className="text-left pb-4 ">{`Your management proxy can configure networking settings (network keys and sponsorship).`}</div>

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
              placeholder="~sampel"
              className="pl-4 pr-4 py-0 w-full h-[38px] font-[500] text-[20px] bg-transparent placeholder-secondary-color text-primary-color"
              onChange={(e) => setNewSponsorPatp(e.currentTarget.value)}
              value={newSponsorPatp}
            />
          </div>
        </div>
      </ControlBox>
    </Container>
  );
};

export default Sponsor;
