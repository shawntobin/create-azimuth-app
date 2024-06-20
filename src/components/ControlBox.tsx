import React from "react";
import BackButton from "./BackButton";
import classNames from "classnames";

interface ControlBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  headerContent: React.ReactNode;
  buttonTitle?: string;
  className?: string;
  onSubmit?: () => void;
  hideBackButton?: boolean;
  disabled?: boolean;
}

const ControlBox: React.FC<ControlBoxProps> = ({
  children,
  headerContent,
  buttonTitle,
  className,
  onSubmit,
  hideBackButton,
  disabled,
}) => {
  return (
    <div>
      {!hideBackButton && <BackButton />}
      <div
        className={`flex flex-col w-[500px] rounded-[18px] border border-primary-color ${className}`}
      >
        <div className="mb-0 text-left w-full flex justify-between px-3 py-1 border-b border-primary-color">
          {headerContent}
        </div>
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
                "bg-primary-color": !disabled,
                "bg-gray-400": disabled,
              }
            )}
            onClick={onSubmit}
          >
            {buttonTitle}
          </button>
        )}
      </div>
    </div>
  );
};

export default ControlBox;
