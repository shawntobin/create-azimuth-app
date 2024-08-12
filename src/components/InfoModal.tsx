import Modal from "react-modal";
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

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
    // height: 193,
    padding: 18,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.7)",
  },
};

Modal.setAppElement("#root");

const InfoModal = ({ text, isOpen, handleClose }) => {
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
      <div className="w-[600px] text-[20px] p-2">
        <div className="flex justify-start items-center mb-2">
          <InformationCircleIcon className="w-7 h-7 text-[yellow]" />

          <div className="font-[600] ml-2">Information</div>
        </div>

        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>
      <div className="text-right text-[16px]">
        <button
          className="rounded-[10px] items-center justify-center flex-col border border-primary-color bg-white text-black py-1 px-3 mr-2"
          onClick={handleClose}
        >
          Dismiss
        </button>
      </div>
    </Modal>
  );
};

export default InfoModal;
