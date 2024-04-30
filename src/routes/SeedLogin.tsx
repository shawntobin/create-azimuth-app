import { useState } from "react";
import Container from "../components/Container";
import { walletFromMnemonic } from "../lib/wallet";
import useLogin from "../hooks/useLogin";

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
      <div className="w-[500px]">
        <div className="text-md mb-2 mt-6 text-white text-left text-[30px]">
          Seed Phrase
        </div>

        <div className="flex items-center bg-white rounded-lg overflow-hidden h-[132px]">
          <textarea
            placeholder="example crew supreme gesture quantum web media hazard theory mercy wing kitten"
            className="flex-1 px-4 py-2 bg-transparent outline-none text-black resize-none text-[25px]"
            rows={3}
            value={seedInput}
            onChange={(e) => setSeedInput(e.currentTarget.value)}
          ></textarea>

          <button
            className="bg-light-green px-0 py-0 rounded-r-lg h-[100%] w-[30px] text-black text-[50px] font-[300]"
            onClick={handleSeedLogin}
          >
            &gt;
          </button>
        </div>
      </div>
    </Container>
  );
};

export default SeedLogin;
