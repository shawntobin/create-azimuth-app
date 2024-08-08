import { useState } from "react";
import { walletFromMnemonic } from "../lib/wallet";
import useLogin from "../hooks/useLogin";
import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import ControlBox from "../components/ControlBox";
import Breadcrumbs from "../components/Breadcrumbs";
import UrbitSymbols from "../components/UrbitSymbols";
import SeedModal from "../components/SeedModal";
import { LOGIN_METHODS } from "../constants/constants";

import { DEFAULT_HD_PATH } from "../constants/constants";

const SeedLogin = () => {
  const [seedInput, setSeedInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [seedOptions, setSeedOptions] = useState({
    skipPassphrase: false,
    passphraseHDPath: false,
    legacyValidation: false,
  });
  const [passphraseInput, setPassphraseInput] = useState("");
  const [hdPathInput, setHdPathInput] = useState("");

  const { loginCommon } = useLogin();

  const handleSeedLogin = async () => {
    // clean this input btw
    const wallet = walletFromMnemonic(seedInput, DEFAULT_HD_PATH);

    if (wallet.address) {
      await loginCommon(wallet.address, LOGIN_METHODS.SEED, "", wallet);
    } else {
      // error
    }
  };

  const handleSeedOptions = (option: string) => {
    setSeedOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  return (
    <div className="fixed bg-base-color text-primary-color top-0 left-0 h-screen w-screen">
      <div className={`flex flex-col h-full`}>
        <div className="text-center justify-center items-center flex text-[20px] mt-8">
          <Breadcrumbs walletAddress={""} />
        </div>

        <div className="flex-grow flex flex-col items-center justify-center pb-10">
          <ControlBox
            className="w-[500px]"
            headerContent={
              <div className="text-left w-full flex justify-between">
                <div className="text-[20px] font-bold">Seed Phrase</div>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-transparent p-0 m-0 focus:outline-none border-none"
                >
                  <Cog8ToothIcon className="h-6 w-6 hover:text-light-gray" />
                </button>
              </div>
            }
            buttonTitle="Log in"
            onSubmit={handleSeedLogin}
          >
            <textarea
              className="flex-1 px-4 py-1 bg-transparent outline-none text-primary-color resize-none text-[20px] placeholder-secondary-color"
              placeholder="example crew supreme gesture quantum web media hazard theory mercy wing kitten"
              rows={3}
              value={seedInput}
              onChange={(e) => setSeedInput(e.currentTarget.value)}
            ></textarea>

            {seedOptions.passphraseHDPath && (
              <>
                <div className="border-t">
                  <div className="text-left w-full flex px-3 py-1 text-[20px] font-bold border-b">
                    Passphrase
                  </div>
                  <textarea
                    className="px-4 py-2 bg-transparent outline-none text-primary-color resize-none text-[20px] placeholder-secondary-color w-full"
                    placeholder="Passphrase"
                    rows={1}
                    value={passphraseInput}
                    onChange={(e) => setPassphraseInput(e.currentTarget.value)}
                  ></textarea>
                </div>
                <div className="border-t">
                  <div className="text-left w-full flex px-3 py-1 text-[20px] font-bold border-b">
                    HD Path
                  </div>
                  <textarea
                    className="px-4 py-2 bg-transparent outline-none text-primary-color resize-none text-[20px] placeholder-secondary-color w-full"
                    placeholder="M/44'/60'/0'/0/0"
                    rows={1}
                    value={hdPathInput}
                    onChange={(e) => setHdPathInput(e.currentTarget.value)}
                  ></textarea>
                </div>
              </>
            )}
          </ControlBox>
        </div>
        <SeedModal
          isOpen={showModal}
          handleClose={() => setShowModal(false)}
          seedOptions={seedOptions}
          handleSeedOptions={handleSeedOptions}
        />
        <UrbitSymbols />
      </div>
    </div>
  );
};

export default SeedLogin;
