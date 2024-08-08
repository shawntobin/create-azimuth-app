import { useEffect, useState } from "react";
import useLogin from "../hooks/useLogin";
import UrbitSymbols from "../components/UrbitSymbols";
import Navbar from "../components/Navbar";

const LandingPage2 = () => {
  return (
    <>
      <div className="fixed bg-black text-primary-color top-0 left-0 h-screen w-screen">
        <div className="absolute left-0 right-0">
          <Navbar />

          <div className="text-left p-10">
            <div className="flex items-center">
              <div className="text-[120px] font-[300] w-full">
                Welcome to Urbit ID
              </div>

              <div className="flex flex-row justify-center space-x-3 text-[50px] font-bold">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="text-[60px] font-[200]">
              Urbit ID is your identity hub. Here, you can manage your Urbit ID,
              customize your sigil, and learn where to get an ID.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage2;
