import React, { useState } from "react";
import BackButton from "./BackButton";
import classNames from "classnames";
import BeatLoader from "react-spinners/BeatLoader";
import MoonLoader from "react-spinners/MoonLoader";

interface ControlBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  buttonTitle?: React.ReactNode;
  buttonColor?: string;
  className?: string;
  onSubmit?: () => void;
  hideBackButton?: boolean;
  disabled?: boolean;
  txnInProgress?: boolean;
  txnHash?: string | null;
  width?: string;
  height?: string;
}

const ControlBox: React.FC<ControlBoxProps> = ({
  children,
  headerContent,
  buttonTitle,
  buttonColor = "bg-primary-color",
  className,
  onSubmit,
  hideBackButton,
  disabled,
  txnInProgress,
  txnHash,
  width,
  height,
}) => {
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
          Awaiting wallet confirmation...
        </div>
      );
    } else {
      return buttonTitle;
    }
  };

  return (
    <div>
      {!hideBackButton && <BackButton />}
      <div
        style={{ width, height }}
        className={`flex flex-col w-[500px] rounded-[18px] border border-primary-color ${className}`}
      >
        {headerContent && (
          <div className="mb-0 text-left w-full flex justify-between px-3 py-1 border-b border-primary-color">
            {headerContent}
          </div>
        )}
        {children}
        {buttonTitle && (
          <button
            disabled={disabled}
            style={{
              marginBottom: "-1px",
              marginLeft: "-1px",
              marginRight: "-1px",
            }}
            className={classNames(
              "mt-auto p-0 m-0 rounded-b-[18px] h-[38px] text-black text-[20px] font-bold",
              {
                [buttonColor]: !disabled,
                "bg-gray-400": disabled,
              }
            )}
            onClick={onSubmit}
          >
            {renderButtonContent()}
          </button>
        )}
      </div>
    </div>
  );
};

export default ControlBox;
