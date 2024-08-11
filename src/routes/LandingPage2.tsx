import { useEffect, useState } from "react";
import useLogin from "../hooks/useLogin";
import UrbitSymbols from "../components/UrbitSymbols";
import Navbar from "../components/Navbar";
import LandingItem from "../components/LandingItem";

const LandingPage2 = () => {
  return (
    <>
      <div className="fixed bg-black text-primary-color top-0 left-0 h-screen w-screen overflow-auto">
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

            <div className="flex w-full mt-10 justify-between">
              <LandingItem
                title="Star Scanner"
                description="Search stars and find planets that can be spawned from them."
                image="/sigils_black.png"
                link="/star-scanner"
              />

              <LandingItem
                title="Get Urbit ID"
                description="Navigate to OpenSea to buy Planets or Stars."
                image="/opensea_logo.png"
                link="/star-scanner"
              />
              <LandingItem
                title="Sigil Designer"
                description="Customize your Sigil colors and download an image."
                image="/sigil_large.png"
                link="/sigil-designer"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage2;
