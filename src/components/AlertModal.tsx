import Modal from "react-modal";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#000000",
    color: "#FFFFFF",
    font: 20,
    borderRadius: 22,
    height: 193,
    padding: 18,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.7)",
  },
};

Modal.setAppElement("#root");

const AlertModal = ({ isOpen, handleClose }) => {
  const navigate = useNavigate();

  return (
    <Modal
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      isOpen={isOpen}
      onAfterOpen={() => {}}
      onRequestClose={handleClose}
      style={customStyles}
    >
      <div className="w-[600px] text-[20px]">
        <div className="flex align-center items-center">
          <ExclamationTriangleIcon className="w-7 h-7 text-[yellow]" />

          {/* <UrbitIcon name={"alert"} size={31} /> */}

          <div className="font-[600] ml-1">Caution</div>
        </div>
        <div className="w-[400px]">
          Changes made within the Control Panel are irreversible and can affect
          the ownership of your address space (Planet, Star, Galaxy).
        </div>
      </div>
      <div className="text-right text-[16px]">
        <button
          className="rounded-full items-center justify-center flex-col border border-[#DF0000] text-[#DF0000] bg-transparent py-1 px-3 "
          onClick={() => navigate(-1)}
        >
          Return
        </button>
        <button
          className="rounded-full items-center justify-center flex-col border border-primary-color bg-white text-black py-1 px-3 ml-2"
          onClick={handleClose}
        >
          Continue
        </button>
      </div>
    </Modal>
  );
};

export default AlertModal;
