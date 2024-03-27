import planetBlack from "../assets/planet-black.png";
// import starBlack from "../assets/star-black.png";
// import galaxyBlack from "../assets/galaxy-black.png";
import * as ob from "urbit-ob";
import Sigil from "../components/Sigil";

const UrbitIdCard = (props: { patp: string }) => {
  const { patp } = props;

  const id = ob.patp2dec(patp);

  return (
    <div className="w-[500px] h-[312.5px] bg-white text-black p-2.5 rounded-lg">
      <img src={planetBlack} alt="urbit planet" className="w-10 h-10" />

      <div className="flex items-center justify-center">
        <Sigil id={patp} size={40} colors={["white", "black"]} />

        <div className="text-3xl">{patp}</div>
      </div>
      <div>
        Azimuth Point: <span>{id}</span>
      </div>
    </div>
  );
};

export default UrbitIdCard;
