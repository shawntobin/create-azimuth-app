import { useState } from "react";
import Container from "../components/Container";
import { walletFromMnemonic } from "../lib/wallet";
import useLogin from "../hooks/useLogin";
import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import BackButton from "../components/BackButton";

const SeedLogin = () => {
  const [seedInput, setSeedInput] = useState("");
  const { loginCommon } = useLogin();

  const handleSeedLogin = async () => {
    // clean this input btw
    const wallet = walletFromMnemonic(seedInput, "m/44'/60'/0'/0/0");
    console.log("wallet", wallet);

    if (wallet.address) {
      await loginCommon(wallet.address);
    } else {
      // error
    }
  };

  return (
    <Container>
      <div className="flex flex-col w-[500px] rounded-[18px] overflow-hidden h-[185px] border border-light-green">
        <div className="mb-2 text-left w-full flex justify-between p-2 border-b border-light-green">
          <div className="text-[20px] font-bold">Seed Phrase</div>
          <button onClick={() => {}} className="bg-transparent p-0 m-0">
            <Cog8ToothIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-grow items-center">
          <textarea
            className="flex-1 px-4 py-1 bg-transparent outline-none text-light-green resize-none text-[20px] placeholder-medium-green"
            placeholder="example crew supreme gesture quantum web media hazard theory mercy wing kitten"
            rows={3}
            value={seedInput}
            onChange={(e) => setSeedInput(e.currentTarget.value)}
          ></textarea>
        </div>

        <button
          className="bg-light-green mt-auto p-0 m-0 rounded-b-[18px] w-full h-[38px] text-black text-[20px] font-bold"
          onClick={handleSeedLogin}
        >
          Log in
        </button>
      </div>
    </Container>
  );
};

export default SeedLogin;
