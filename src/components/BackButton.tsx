import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="h-[22px] w-[22px] p-0 pb-1 text-[25px] border border-primary-color rounded-[7px] flex items-center justify-center bg-transparent focus:outline-none focus:bg-transparent active:bg-transparent hover:text-secondary-color text-light-gray"
    >
      {`<`}
    </button>
  );
};

export default BackButton;
