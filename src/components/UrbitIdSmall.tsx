import React from "react";
import * as ob from "urbit-ob";
import Sigil from "./Sigil";

const UrbitIdSmall = (props: {
  urbitId: number;
  handleClick: (patp: string, id: number) => void;
  size?: number;
  textSize?: number;
  isSpawned?: boolean;
}) => {
  const {
    urbitId,
    handleClick,
    size = 100,
    textSize = 16,
    isSpawned = false,
  } = props;

  const patp = ob.patp(urbitId);

  return (
    <button
      disabled={isSpawned}
      style={{ width: size * 1.2 }}
      className="relative flex flex-col items-center justify-center bg-transparent p-1 transition-colors duration-200 ease-in-out border-none outline-none focus:outline-none"
      onClick={() => {
        handleClick(patp, urbitId);
      }}
    >
      <div
        style={{ width: size, height: size }}
        className={`relative mb-[3px] rounded-[13px] overflow-hidden border justify-center items-center flex 
        ${
          !isSpawned &&
          "hover:border-[#FAFF00] transform transition-transform duration-300 ease-in-out hover:scale-110 group"
        }
        }`}
      >
        <Sigil id={patp} colors={["black", "white"]} size={size * 0.8} />
        {isSpawned && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-center text-sm p-2 rounded">
            <div className="bg-medium-gray rounded-full border border-black text-black px-2 py-1">
              Spawned
            </div>
          </div>
        )}
        {!isSpawned && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-center text-sm p-2 rounded hidden group-hover:flex">
            <div className="bg-[#FAFF00] rounded-full border border-black text-black px-2 py-1">
              Spawn
            </div>
          </div>
        )}
      </div>
      <div>
        <div
          className="text-center text-white text-med mt-0 font-[700]"
          style={{ fontSize: textSize }}
        >
          {patp}
        </div>
      </div>
    </button>
  );
};

export default UrbitIdSmall;
