import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="text-[40px] flex items-center justify-center bg-transparent border-none p-2 focus:outline-none focus:bg-transparent active:bg-transparent"
    >
      {`<`}
    </button>
  );
};

export default BackButton;
