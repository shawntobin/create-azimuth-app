import * as ob from "urbit-ob";
import Sigil from "../components/Sigil";
import { formatNumber } from "../utils/helper";
import UrbitIcon from "./UrbitIcon";
import { Tooltip } from "react-tooltip";

const UrbitIdCard = (props) => {
  const { ship, className } = props;

  const { patp, layer, keyRevisionNumber } = ship;

  const point = ob.patp2dec(patp);
  const parent = ob.sein(patp);
  const shipType = ob.clan(patp);
  const keysSet = keyRevisionNumber !== 0;

  const statusMessage = `This ship's keys have ${
    keysSet ? "" : "not"
  } been set.`;

  const statusColor = !keysSet
    ? "bg-red-400 border-red-200"
    : "bg-green-400 border-green-200";

  return (
    <div
      className={`w-[582px] h-[363px] bg-white text-black p-[35px] rounded-[30px] flex flex-col justify-start ${className}`}
    >
      <div className="flex-1">
        <div className="ml-[-5px] flex justify-between items-center mr-10">
          <Sigil id={patp} size={60} colors={["white", "black"]} />

          <span
            className={`h-2.5 w-2.5 ${statusColor} rounded-full border-2`}
            data-tooltip-id="my-tooltip"
            data-tooltip-content={statusMessage}
          ></span>
          <Tooltip
            id="my-tooltip"
            style={{
              backgroundColor: "#4E554B",
              color: "white",
              fontWeight: 600,
              fontSize: "18px",
            }}
          />
        </div>
        <div className="flex items-center justify-start text-left  mt-[35px] pb-[65px]">
          <UrbitIcon name={shipType} size={26} />

          <div className="text-[43px] ml-1 w-full flex items-center justify-center pr-8">
            {patp}
          </div>
        </div>
      </div>

      {shipType === "planet" && (
        <div className="flex  m-0 p-0 items-center">
          <UrbitIcon name="star" size={26} />
          <div className="text-[22px] font-[600] pr-10 pl-2 w-[100px] text-left">
            Star
          </div>
          <div className="text-[22px] font-[800] font-['UrbitSansMono'] text-left">
            {parent}
          </div>
        </div>
      )}

      <div className="items-end flex m-0 p-0 items-center">
        {ob.clan(patp) !== "galaxy" && (
          <>
            <UrbitIcon name="galaxy" size={26} />
            <div className="text-[22px] font-[600] pr-10 pl-2 w-[100px] text-left">
              Galaxy
            </div>
            <div className="text-[22px] font-[800] font-['UrbitSansMono'] text-left pr-20">
              {ob.sein(parent)}
            </div>
          </>
        )}
        <UrbitIcon name="azimuth" size={26} />
        <div className="text-[14px]  pr-20 pl-2 font-[700]">
          {formatNumber(point)}
        </div>
        <div className="text-[12px] border px-1 py-0 rounded-[3px] font-['UrbitSansMono'] font-[800]">
          {layer.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default UrbitIdCard;
