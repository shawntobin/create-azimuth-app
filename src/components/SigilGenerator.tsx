import { useState } from "react";
import Container from "../components/Container";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import ControlBox from "../components/ControlBox";
import useWalletStore from "../store/useWalletStore";
import toast from "react-hot-toast";
import { formatAddress } from "../utils/helper";
import { copy } from "../utils/helper";
import * as txn from "../utils/transaction";
import GasDropdown from "../components/GasDropdown";
import Sigil from "../components/Sigil";

const SigilGenerator = () => {
  const { selectedShip } = useWalletStore();

  const { patp } = selectedShip;

  return (
    <Container headerText={`Urbit Id / Advanced Settings / Sigil Generator`}>
      <ControlBox
        onSubmit={() => {}}
        headerContent={
          <div className="text-left w-full flex justify-between text-[20px]">
            <div className="items-center justify-center flex  ">
              <div className="font-bold">Sigil Generator</div>
            </div>
            {patp}
          </div>
        }
        buttonTitle="Download Sigil"
        className="h-[461px] w-[484px]"
      >
        <div className="text-[20px] justify-start flex flex-col items-start p-5 border-b border-primary-color h-full">
          <Sigil id={patp} size={125} colors={["white", "black"]} />
          <div className="flex justify-between w-full pr-4 mr-0"></div>
        </div>
        <div className="flex items-center"></div>
      </ControlBox>
    </Container>
  );
};

export default SigilGenerator;
