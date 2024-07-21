import { useState } from "react";
import Container from "../components/Container";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import ControlBox from "../components/ControlBox";
import useWalletStore from "../store/useWalletStore";
import toast from "react-hot-toast";
import { formatAddress } from "../utils/address";
import { copy, calculateMaxTransactionCost } from "../utils/helper";
import * as txn from "../utils/transaction";
import { ETH_ZERO_ADDR } from "../constants/constants";
import Dropdown from "../components/Dropdown";
import useGasEstimate from "../hooks/useGasEstimate";
import { isAddress } from "web3-validator";
import { GAS_LIMITS } from "../constants/constants";
import { isZeroAddress } from "../utils/address";
import BackButton from "../components/BackButton";

const Hosting = () => {
  return (
    <Container>
      <div>
        <BackButton />
        <div className="mb-10 w-[500px] flex justify-start items-start text-left">
          Choose between getting hosted by Red Horizon or running your own urbit
          ship the decentralized way.
        </div>
        <div className="flex">
          <ControlBox
            width="275px"
            height="451px"
            hideBackButton
            headerContent={
              <div className="text-left w-full flex justify-between">
                <div className="items-center justify-center flex text-[20px] ">
                  <div className="font-bold">Get Hosted with Red Horizon</div>
                </div>
              </div>
            }
            buttonTitle="Select"
            onSubmit={() => {}}
          >
            <div className="text-[16px] justify-start flex flex-col items-start  h-full mt-2">
              <div className="flex justify-center items-center w-full h-full py-10">
                <img
                  src="src/assets/red-horizon-logo.png"
                  alt="red horizon logo"
                  className="w-[113px] h-[113px]"
                />
              </div>
              <div className="text-left py-3  px-3 text-[16px] font-[400] border-t text-[#D5D5D5]">{`Import your Urbit ID to Red Horizon’s free hosting service. No maintenance required, easy to access from any device.
`}</div>
            </div>
          </ControlBox>
          <ControlBox
            width="275px"
            height="451px"
            className="ml-8"
            hideBackButton
            headerContent={
              <div className="text-left w-full flex justify-between">
                <div className="items-center justify-center flex text-[20px] ">
                  <div className="font-bold">
                    Run Urbit Yourself{" "}
                    <span className="text-dark-gray">(Advanced)</span>
                  </div>
                </div>
              </div>
            }
            buttonTitle="Select"
            onSubmit={() => {}}
          >
            <div className="text-[16px] justify-start flex flex-col items-start h-full">
              <div className="flex justify-start items-start w-full h-full">
                <img
                  src="src/assets/urbit-dojo.png"
                  alt="red horizon logo"
                  className="w-full h-full"
                />
              </div>
              <div className="text-left pt-3 pb-9 px-3 text-[16px] font-[400] border-t text-[#D5D5D5]">{`Run your Urbit on your own machine at home or in the cloud.

`}</div>
            </div>
          </ControlBox>
        </div>
      </div>
    </Container>
  );
};

export default Hosting;
