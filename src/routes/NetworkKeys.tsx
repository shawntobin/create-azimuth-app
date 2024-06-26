import { useState } from "react";
import Container from "../components/Container";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import ControlBox from "../components/ControlBox";
import useWalletStore from "../store/useWalletStore";
import toast from "react-hot-toast";
import * as ob from "urbit-ob";
import Checkbox from "../components/Checkbox";

const NetworkKeys = () => {
  // const { walletAddress, selectedShip } = useWalletStore();
  const [factoryReset, setFactoryReset] = useState(false);
  const [customSeed, setCustomSeed] = useState(false);

  return (
    <Container>
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
        className="h-[292px]"
      >
        <div className="justify-start flex flex-col items-start text-left p-2 mt-2">
          <div className="pb-4">
            <Checkbox
              label="Factory Reset"
              checked={factoryReset}
              onChange={() => setFactoryReset(!factoryReset)}
            />
            <div className="text-[20px] px-8">
              Use if your ship is corrupted, you lost your files, or you want to
              erase your data
            </div>
          </div>
          <div>
            <Checkbox
              label="Custom Network Seed"
              checked={customSeed}
              onChange={() => setCustomSeed(!customSeed)}
            />
            <div className="text-[20px] pl-8">
              Enter your own custom network seed to derive from
            </div>
          </div>
        </div>
      </ControlBox>
    </Container>
  );
};

export default NetworkKeys;
