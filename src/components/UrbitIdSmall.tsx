import * as ob from "urbit-ob";
import Sigil from "./Sigil";

const UrbitIdSmall = (props: {
  urbitId: number;
  handleClick: (patp: string, id: number) => void;
  size?: number;
  textSize?: number;
}) => {
  const { urbitId, handleClick, size = 100, textSize = 16 } = props;

  const patp = ob.patp(urbitId);

  return (
    <button
      style={{ width: size * 1.2 }}
      className="flex flex-col items-center justify-center bg-transparent p-1 transition-colors duration-200 ease-in-out hover:border-none border-none outline-none focus:outline-none"
      onClick={() => {
        handleClick(patp, urbitId);
      }}
    >
      <div
        style={{ width: size, height: size }}
        className="mb-[3px] rounded-[13px] overflow-hidden border justify-center items-center flex transform transition-transform duration-300 ease-in-out hover:scale-110"
      >
        <Sigil id={patp} colors={["black", "white"]} size={size * 0.8} />
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
