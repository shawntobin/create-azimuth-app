import { useState } from "react";
import Container from "../components/Container";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import BackButton from "../components/BackButton";
import ControlBox from "../components/ControlBox";
import useWalletStore from "../store/useWalletStore";
import { formatAddress } from "../utils";

const Ownership = () => {
  const { walletAddress, selectedShip } = useWalletStore();

  return (
    <Container>
      <ControlBox
        headerContent={
          <div className="text-left w-full flex justify-between">
            <div className="items-center justify-center flex text-[20px] ">
              <div className="font-bold">Ownership Address</div>
              <div className="font-[200] ml-3">
                {formatAddress(walletAddress)}
              </div>
            </div>
            <button onClick={() => {}} className="bg-transparent p-0 m-0">
              <DocumentDuplicateIcon className="h-6 w-6" />
            </button>
          </div>
        }
        buttonTitle="Log in"
        onSubmit={() => {}}
        className="h-[185px]" // LEFT OFF HERE
      >
        <div className="justify-start flex flex-col items-start pl-2 border-b">
          <div className="text-[20px] font-bold ">{`Transfer ${selectedShip.patp} to a new owner.`}</div>

          <div className="text-[20px] mt-[20px] mb-1">Ethereum Address:</div>
        </div>
      </ControlBox>
    </Container>
  );
};

export default Ownership;
