import planetBlack from "../assets/planet-black.png";
// import starBlack from "../assets/star-black.png";
// import galaxyBlack from "../assets/galaxy-black.png";
import * as ob from "urbit-ob";
import Sigil from "../components/Sigil";

const UrbitIdCard = (props: { patp: string; className?: string }) => {
  const { ship, className } = props;

  const { patp, layer } = ship;

  const id = ob.patp2dec(patp);
  const parent = ob.sein(patp);

  return (
    <div
      className={`w-[500px] h-[312.5px] bg-white text-black p-2.5 rounded-[30px] flex flex-col justify-between ${className}`}
    >
      <div>
        <img src={planetBlack} alt="urbit planet" className="w-10 h-10" />

        <div className="flex items-center justify-center">
          <Sigil id={patp} size={50} colors={["white", "black"]} />

          <div className="text-[30px] ml-1">{patp}</div>
        </div>
        <div
          style={{ fontFamily: "monospace" }}
          className="text-[10px] text-medium-gray mt-2"
        >
          Azimuth Point: <span>{id}</span> | Key revisions: <span>{1}</span> |
          Owners: <span>{1}</span> | {layer}
        </div>
      </div>

      <div className="text-medium-gray">
        {`${ob.sein(parent)} ->
        ${ob.sein(patp)} ->
        ${patp}`}
      </div>
    </div>
  );
};

export default UrbitIdCard;
