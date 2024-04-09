import { useState } from "react";

import planetWhite from "../assets/planet-white.png";
import starWhite from "../assets/star-white.png";
import galaxyWhite from "../assets/galaxy-white.png";
import Container from "../components/Container";

const CodeLogin = () => {
  const [seedInput, setSeedInput] = useState("");

  const renderCodeLoginForm = () => {
    return (
      <>
        <div className="flex flex-row justify-center w-[100%] space-x-10 mb-6">
          <img
            src={planetWhite}
            alt="urbit planet symbol"
            className="w-[100px] h-[100px]"
          />
          <img
            src={starWhite}
            alt="urbit star symbol"
            className="w-[100px] h-[100px]"
          />
          <img
            src={galaxyWhite}
            alt="urbit galaxy symbol"
            className="w-[100px] h-[100px]"
          />
        </div>
        <div className="text-[40px] mb-7 text-white">
          Manage your address space
        </div>
        <div className="text-[30px] mb-2 text-white text-left">
          Master Ticket & Activation Code
        </div>

        <div className="relative flex items-center mb-3">
          <input
            type="text"
            placeholder="~sampel-palnet"
            className="pl-4 pr-20 py-2 rounded-full border-2 border-white text-black w-[500px] text-[25px] h-[61px]"
          />

          <button className="text-black absolute inset-y-0 right-0 flex items-center justify-center bg-light-green rounded-full p-2 h-[61px] w-[61px]">
            <img src="src/assets/sigil-button.png" alt="urbit sigil" />
          </button>
        </div>

        <div className="relative flex items-center mb-3 w-[500px]">
          <input
            type="text"
            placeholder="Master Ticket / Activation Code"
            className="pl-4 pr-20 py-2 rounded-full border-2 border-white w-full text-black text-[25px] h-[61px]"
          />

          <button className="text-black absolute inset-y-0 right-0 flex items-center justify-center bg-light-green rounded-full h-[61px] w-[61px] text-[50px] p-2 pt-0 font-[300]">
            &gt;
          </button>
        </div>

        <div className="text-center my-4">
          <span className="text-white mb-2 inline-block text-[30px]">or</span>
          <div className="border-b border-white border-opacity-50 mx-auto w-80" />
        </div>

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
              onClick={() => {}}
            >
              &gt;
            </button>
          </div>
        </div>
      </>
    );
  };

  return <Container>{renderCodeLoginForm()}</Container>;
};

export default CodeLogin;
