import React from "react";
import * as ob from "urbit-ob";
import Sigil from "./Sigil";

const UrbitIdMedium = (props: {
  urbitId: number;
  handleClick: (patp: string, id: number) => void;
  size?: number;
  textSize?: number;
  spawnable?: boolean;
  online?: boolean;
}) => {
  const {
    urbitId,
    handleClick,
    size = 100,
    textSize = 16,
    spawnable = false,
    online = false,
  } = props;

  const patp = ob.patp(urbitId);

  return (
    <button
      style={{ width: size * 1.2 }}
      className="relative flex flex-col items-center justify-center bg-transparent p-1 transition-colors duration-200 ease-in-out border-none outline-none focus:outline-none"
      onClick={() => {
        handleClick(patp, urbitId);
      }}
    >
      <div
        style={{ width: size, height: size }}
        className={`relative mb-[3px] rounded-[13px] overflow-hidden border justify-center items-center flex transform transition-transform duration-300 ease-in-out hover:scale-110 group ${
          spawnable && "hover:border-[#FAFF00]"
        }
        }`}
      >
        <Sigil id={patp} colors={["black", "white"]} size={size * 0.8} />

        <div className="absolute right-2 top-2 flex items-center justify-center bg-black bg-opacity-0 text-white text-center text-sm rounded ">
          <div
            className="rounded-full text-black px-[3px] py-[3px]"
            style={{ backgroundColor: online ? "#AAE68C" : "gray" }}
          ></div>
        </div>
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

export default UrbitIdMedium;
