import * as ob from "urbit-ob";
import Sigil from "./Sigil";

const UrbitIdSmall = (props: {
  urbitId: number;
  handleClick: (patp: string, id: number) => void;
}) => {
  const { urbitId, handleClick } = props;

  const patp = ob.patp(urbitId);

  return (
    <button
      className="w-[120px] flex flex-col items-center justify-center bg-transparent p-2 rounded-lg transition-colors duration-200 ease-in-out hover:border-[#AAE68C] "
      onClick={() => {
        handleClick(patp, urbitId);
      }}
    >
      <div className="m-[10px] rounded-[20px] overflow-hidden w-[100px] h-[100px] border justify-center items-center flex">
        <Sigil id={patp} colors={["black", "white"]} size={80} />
      </div>
      <div>
        <div className="text-center text-white text-med mt-0">{patp}</div>
      </div>
    </button>
  );
};

export default UrbitIdSmall;
