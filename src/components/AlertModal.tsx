import Modal from "react-modal";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import UrbitIcon from "./UrbitIcon";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#14140F",
    color: "#FFFFFF",
    font: 20,
    borderRadius: 10,
    height: 200,
    padding: 0,
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
        <div className="flex align-center items-center p-3 border-b border-medium-gray">
          <ExclamationTriangleIcon className="w-5 h-5 text-[yellow]" />

          {/* <UrbitIcon name={"alert"} size={31} /> */}

          <div className="font-[600] ml-1">Caution</div>
        </div>
        <div className="w-[600px] p-3">
          Changes made within Setttings are irreversible. They can effect the ownership of your Urbit ID and can interfere with your Urbit's performance and networking capabilities if not done correctly.
        </div>
      </div>
      <div className="text-right text-[16px] p-3">
        <button
          className="rounded-[10px] items-center justify-center flex-col border border-primary-color text-primary-color bg-transparent py-1 px-3 "
          onClick={() => navigate(-1)}
        >
          Return
        </button>
        <button
          className="rounded-[10px] items-center justify-center flex-col border border-primary-color bg-white text-black py-1 px-3 ml-2"
          onClick={handleClose}
        >
          Continue
        </button>
      </div>
    </Modal>
  );
};

export default AlertModal;
