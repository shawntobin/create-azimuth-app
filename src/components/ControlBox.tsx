import React, { useState } from "react";
import BackButton from "./BackButton";
import InfoButton from "./InfoButton";
import classNames from "classnames";
import BeatLoader from "react-spinners/BeatLoader";
import { WALLET_TYPES } from "../constants/constants";
import InfoModal from "./InfoModal";

interface ControlBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  buttonTitle?: React.ReactNode;
  buttonColor?: string;
  className?: string;
  onSubmit?: () => void;
  hideBackButton?: boolean;
  hideInfoButton?: boolean;
  disabled?: boolean;
  txnInProgress?: boolean;
  txnHash?: string | null;
  width?: string;
  height?: string;
  walletType?: symbol;
  infoModalText?: string;
}

const ControlBox: React.FC<ControlBoxProps> = ({
  children,
  headerContent,
  buttonTitle,
  buttonColor = "bg-primary-color",
  className,
  onSubmit,
  hideBackButton,
  hideInfoButton,
  disabled,
  txnInProgress,
  txnHash,
  width,
  height,
  walletType,
  infoModalText,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const renderButtonContent = () => {
    if (txnHash) {
      return (
        <div className="flex items-center justify-center">
          <>
            Transaction in progress
            <span className="ml-2">
              <BeatLoader
                color={"black"}
                loading={true}
                size={10}
                aria-label="Loading Spinner"
              />
            </span>
          </>
        </div>
      );
    } else if (txnInProgress) {
      return (
        <div className="flex items-center justify-center">
          {walletType === WALLET_TYPES.METAMASK
            ? "Awaiting wallet confirmation..."
            : "Transaction in progress..."}
        </div>
      );
    } else {
      return buttonTitle;
    }
  };

  return (
    <div>
      <InfoModal
        text={infoModalText}
        isOpen={showInfo}
        handleClose={() => setShowInfo(false)}
      />
      <div className="w-full flex justify-between mb-[15px] mt-[100px]">
        {!hideBackButton && (
          <div>
            <BackButton />
          </div>
        )}
        <div>
          {!hideInfoButton && <InfoButton onClick={() => setShowInfo(true)} />}
        </div>
      </div>
      <div
        style={{ width, height }}
        className={`flex flex-col w-[500px] rounded-[10px] border border-primary-color ${className}  pb-[23px]`}
      >
        {headerContent && (
          <div className="mb-0 text-left w-full flex justify-between px-5 py-1 border-b border-primary-color">
            {headerContent}
          </div>
        )}
        {children}
        {buttonTitle && (
          <div className="w-full justify-center items-center flex">
            <button
              disabled={disabled}
              className={classNames(
                "rounded-[10px] h-[38px] w-[455px] text-black text-[20px] font-bold items-center justify-center flex",
                {
                  [buttonColor]: !disabled,
                  "bg-gray-400": disabled,
                }
              )}
              onClick={onSubmit}
            >
              {renderButtonContent()}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlBox;
