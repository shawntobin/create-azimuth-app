import { useState } from "react";
import Container from "../components/Container";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import ControlBox from "../components/ControlBox";
import useWalletStore from "../store/useWalletStore";
import toast from "react-hot-toast";
import * as ob from "urbit-ob";

const NetworkKeys = () => {
  const { walletAddress, selectedShip } = useWalletStore();
  const [newSponsor, setNewSponsor] = useState("");

  const { sponsor, layer } = selectedShip;

  const sponsorPatp = ob.patp(sponsor);

  return (
    <Container headerText={`Urbit Id / Advanced Settings / Network Keys`}>
      <ControlBox
        headerContent={
          <div className="text-left w-full flex justify-between">
            <div className="items-center justify-center flex text-[20px] ">
              <div className="font-bold">Set Network Keys</div>
            </div>
          </div>
        }
        buttonTitle="Reset Network Keys"
        onSubmit={() => {}}
        className="h-[217px]"
      >
        <div className="justify-start flex flex-col items-start pl-2 border-b border-primary-color">
          <div className="text-[20px] font-bold ">Factory Reset:</div>
          <div className="text-[20px] font-bold ">Custom Network Seed:</div>
        </div>
        <div className="flex h-full items-center">
          <input
            type="text"
            placeholder="~sampel"
            className="pl-4 pr-4 py-0 w-full h-full font-[500] text-[20px] bg-transparent placeholder-secondary-color"
            onChange={() => {}}
            value={newSponsor}
          />
        </div>
      </ControlBox>
    </Container>
  );
};

export default NetworkKeys;
