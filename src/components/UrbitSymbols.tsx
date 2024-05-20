import planetWhite from "../assets/planet-white.png";
import starWhite from "../assets/star-white.png";
import galaxyWhite from "../assets/galaxy-white.png";
import planetGreen from "../assets/planet-green.png";
import starGreen from "../assets/star-green.png";
import galaxyGreen from "../assets/galaxy-green.png";

const UrbitSymbols = () => {
  return (
    <div className="flex flex-row justify-center space-x-3">
      <img
        src={planetWhite}
        alt="urbit planet symbol"
        className="w-[22.4px] h-[22.4px]"
      />
      <img
        src={starWhite}
        alt="urbit star symbol"
        className="w-[22.4px] h-[22.4px]"
      />
      <img
        src={galaxyWhite}
        alt="urbit galaxy symbol"
        className="w-[22.4px] h-[22.4px]"
      />
    </div>
  );
};

export default UrbitSymbols;
