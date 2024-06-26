import { useState } from "react";
import Container from "../components/Container";
import { walletFromMnemonic } from "../lib/wallet";
import useLogin from "../hooks/useLogin";
import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import ControlBox from "../components/ControlBox";
import Breadcrumbs from "../components/Breadcrumbs";

import { DEFAULT_HD_PATH } from "../constants/constants";

const SeedLogin = () => {
  const [seedInput, setSeedInput] = useState("");
  const { loginCommon } = useLogin();

  const handleSeedLogin = async () => {
    // clean this input btw
    const wallet = walletFromMnemonic(seedInput, DEFAULT_HD_PATH);

    if (wallet.address) {
      await loginCommon(wallet.address);
    } else {
      // error
    }
  };

  return (
    <div className="fixed bg-base-color text-primary-color top-0 left-0 h-screen w-screen">
      <div className={`flex flex-col h-full`}>
        <div className="text-center justify-center items-center flex text-[20px] mt-8">
          <Breadcrumbs walletAddress={""} />
        </div>

        <div className="flex-grow flex flex-col items-center justify-center">
          <ControlBox
            className="h-[185px]"
            headerContent={
              <div className="text-left w-full flex justify-between">
                <div className="text-[20px] font-bold">Seed Phrase</div>
                <button
                  onClick={() => {}}
                  className="bg-transparent p-0 m-0 focus:outline-none border-none"
                >
                  <Cog8ToothIcon className="h-6 w-6" />
                </button>
              </div>
            }
            buttonTitle="Log in"
            onSubmit={handleSeedLogin}
          >
            {/* <div className="flex flex-grow items-center"> */}
            <textarea
              className="flex-1 px-4 py-1 bg-transparent outline-none text-primary-color resize-none text-[20px] placeholder-secondary-color"
              placeholder="example crew supreme gesture quantum web media hazard theory mercy wing kitten"
              rows={3}
              value={seedInput}
              onChange={(e) => setSeedInput(e.currentTarget.value)}
            ></textarea>
            {/* </div> */}
          </ControlBox>
        </div>
      </div>
    </div>
  );
};

export default SeedLogin;
