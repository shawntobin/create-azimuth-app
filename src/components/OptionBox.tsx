import React from "react";
import BackButton from "./BackButton";
import classNames from "classnames";

interface OptionBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  buttonTitle?: React.ReactNode;
  buttonColor?: string;
  className?: string;
  onSubmit?: () => void;
  hideBackButton?: boolean;
  disabled?: boolean;
  width?: string;
  height?: string;
}

const OptionBox: React.FC<OptionBoxProps> = ({
  children,
  headerContent,
  buttonTitle,
  buttonColor = "bg-primary-color",
  className,
  onSubmit,
  hideBackButton,
  disabled,
  width,
  height,
}) => {
  return (
    <div>
      <div className="w-full flex justify-between mb-[15px]">
        {!hideBackButton ? (
          <div>
            <BackButton />
          </div>
        ) : (
          <div className="h-[22px]" />
        )}
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
                "rounded-[10px] h-[38px] w-[246px] text-black text-[20px] font-bold items-center justify-center flex",
                {
                  [buttonColor]: !disabled,
                  "bg-gray-400": disabled,
                }
              )}
              onClick={onSubmit}
            >
              {buttonTitle}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OptionBox;
