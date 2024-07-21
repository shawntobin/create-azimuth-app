import Modal from "react-modal";
import Checkbox from "./Checkbox";

const customStyles = {
  content: {
    top: "54%",
    left: "59%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#000000",
    color: "#FFFFFF",
    font: 20,
    borderRadius: 13,
    padding: 5,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0)",
  },
};

Modal.setAppElement("#root");

const SeedModal = ({ isOpen, handleClose, seedOptions, handleSeedOptions }) => {
  return (
    <Modal
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      isOpen={isOpen}
      onAfterOpen={() => {}}
      onRequestClose={handleClose}
      style={customStyles}
    >
      <div className="justify-start flex flex-col items-start text-left">
        <div>
          <Checkbox
            label="Skip Passphrase Validation"
            checked={seedOptions.skipPassphrase}
            onChange={() => handleSeedOptions("skipPassphrase")}
          />
        </div>
        <div>
          <Checkbox
            label="Passphrase & HD Path"
            checked={seedOptions.passphraseHDPath}
            onChange={() => handleSeedOptions("passphraseHDPath")}
          />
        </div>
        <div>
          <Checkbox
            label="Use Legacy Validation"
            checked={seedOptions.legacyValidation}
            onChange={() => handleSeedOptions("legacyValidation")}
          />
        </div>
      </div>
    </Modal>
  );
};

export default SeedModal;
