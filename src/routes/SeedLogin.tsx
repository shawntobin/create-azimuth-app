import { useState } from "react";
import Container from "../components/Container";
import { walletFromMnemonic } from "../lib/wallet";
import useLogin from "../hooks/useLogin";
import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import ControlBox from "../components/ControlBox";

import { DEFAULT_HD_PATH } from "../constants/constants";

const SeedLogin = () => {
  const [seedInput, setSeedInput] = useState("");
  const { loginCommon } = useLogin();

  const handleSeedLogin = async () => {
    // clean this input btw
    const wallet = walletFromMnemonic(seedInput, DEFAULT_HD_PATH);
    console.log("wallet", wallet);

    if (wallet.address) {
      await loginCommon(wallet.address);
    } else {
      // error
    }
  };

  return (
    <Container>
      <ControlBox
        className="h-[185px]"
        headerContent={
          <div className="text-left w-full flex justify-between">
            <div className="text-[20px] font-bold">Seed Phrase</div>
            <button onClick={() => {}} className="bg-transparent p-0 m-0">
              <Cog8ToothIcon className="h-6 w-6" />
            </button>
          </div>
        }
        buttonTitle="Log in"
        onSubmit={handleSeedLogin}
      >
        {/* <div className="flex flex-grow items-center"> */}
        <textarea
          className="flex-1 px-4 py-1 bg-transparent outline-none text-light-green resize-none text-[20px] placeholder-medium-green"
          placeholder="example crew supreme gesture quantum web media hazard theory mercy wing kitten"
          rows={3}
          value={seedInput}
          onChange={(e) => setSeedInput(e.currentTarget.value)}
        ></textarea>
        {/* </div> */}
      </ControlBox>
    </Container>
  );
};

export default SeedLogin;
