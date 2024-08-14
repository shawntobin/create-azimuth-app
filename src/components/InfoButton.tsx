import { useNavigate } from "react-router-dom";

const InfoButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      className="font-[800] font-['UrbitSansMono'] h-[22px] w-[22px] p-0 pb-0 text-[14px] border border-primary-color rounded-[7px] flex items-center justify-center bg-transparent focus:outline-none focus:bg-transparent active:bg-transparent hover:text-secondary-color text-white"
    >
      {`i`}
    </button>
  );
};

export default InfoButton;
