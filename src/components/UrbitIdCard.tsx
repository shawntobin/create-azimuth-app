import * as ob from "urbit-ob";
import Sigil from "../components/Sigil";
import { formatNumber, formatSpacedPatp } from "../utils/helper";

const UrbitIdCard = (props) => {
  const { ship, className } = props;

  const { patp, layer } = ship;

  const point = ob.patp2dec(patp);
  const parent = ob.sein(patp);
  const shipType = ob.clan(patp);

  const renderShipSymbol = (shipType) => {
    switch (shipType) {
      case "planet":
        return <span className="text-[20px] font-bold"></span>;
      case "star":
        return <span className="text-[20px] font-bold"></span>;
      case "galaxy":
        return <span className="text-[20px] font-bold"></span>;
      default:
        return <span className="text-[20px] font-bold"></span>;
    }
  };

  return (
    <div
      className={`w-[542px] h-[339px] bg-primary-color text-black p-[44px] rounded-[15px] flex flex-col justify-start ${className}`}
    >
      <div className="flex-1">
        <div className="ml-[-5px] flex justify-between items-center mr-4">
          <Sigil id={patp} size={60} colors={["white", "black"]} />
        </div>
        <div className="flex items-center justify-start text-left  mt-[35px]">
          {renderShipSymbol(shipType)}
          <div className="text-[43px] ml-1 w-full flex items-center justify-center pr-8">
            {patp}
          </div>
        </div>
      </div>

      {shipType === "planet" && (
        <div className="flex  m-0 p-0 items-center">
          <div className="text-[20px] font-bold"></div>
          <div className="text-[22px] font-[600] pr-10 pl-2 w-[100px] text-left">
            Star
          </div>
          <div className="text-[22px] font-bold font-['UrbitSansMono'] text-left">
            {formatSpacedPatp(parent)}
          </div>
        </div>
      )}

      <div className="items-end flex m-0 p-0 items-center">
        {ob.clan(patp) !== "galaxy" && (
          <>
            <div className="text-[20px] font-bold"></div>
            <div className="text-[22px] font-[600] pr-10 pl-2 w-[100px] text-left">
              Galaxy
            </div>
            <div className="text-[22px] font-[800] font-['UrbitSansMono'] text-left pr-20">
              {formatSpacedPatp(ob.sein(parent))}
            </div>
          </>
        )}
        <div className="text-[12px]"></div>
        <div className="text-[12px]  pr-20 pl-2 font-[700]">
          {formatNumber(point)}
        </div>
        <div className="text-[12px] border border-black px-1 py-0 rounded-[3px] font-['UrbitSansMono'] font-bold">
          {layer.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default UrbitIdCard;
