import { useState } from "react";
import Container from "../components/Container";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import ControlBox from "../components/ControlBox";
import useWalletStore from "../store/useWalletStore";
import toast from "react-hot-toast";
import * as ob from "urbit-ob";

const Sponsor = () => {
  const { walletAddress, selectedShip } = useWalletStore();
  const [newSponsor, setNewSponsor] = useState("");

  const { sponsor, layer } = selectedShip;

  const sponsorPatp = ob.patp(sponsor);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    toast.success("Copied to clipboard");
  };

  return (
    <Container headerText={`Urbit Id / Advanced Settings / Change Sponsor`}>
      <ControlBox
        headerContent={
          <div className="text-left w-full flex justify-between">
            <div className="items-center justify-center flex text-[20px] ">
              <div className="font-bold">Sponsor</div>
              <div className="font-[200] ml-3">{sponsorPatp}</div>
            </div>
            <button onClick={handleCopy} className="bg-transparent p-0 m-0">
              <DocumentDuplicateIcon className="h-6 w-6" />
            </button>
          </div>
        }
        buttonTitle="Request New Sponsor"
        onSubmit={() => {}}
        className="h-[217px]"
      >
        <div className="justify-start flex flex-col items-start pl-2 border-b border-light-green">
          <div className="text-[20px] font-bold ">{`Your sponsor is blah blah...`}</div>
          <div className="text-[20px] mt-[20px] mb-1">New sponsor:</div>
        </div>
        <div className="flex h-full items-center">
          <input
            type="text"
            placeholder="~sampel"
            className="pl-4 pr-4 py-0 w-full h-full font-[500] text-[20px] bg-transparent placeholder-medium-green-2"
            onChange={(e) => setNewSponsor(e.currentTarget.value)}
            value={newSponsor}
          />
        </div>
      </ControlBox>
    </Container>
  );
};

export default Sponsor;
