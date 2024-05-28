import React from "react";
import BackButton from "./BackButton";

interface ControlBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  headerContent: React.ReactNode;
  buttonTitle?: string;
  className?: string;
  onSubmit?: () => void;
  hideBackButton?: boolean;
}

const ControlBox: React.FC<ControlBoxProps> = ({
  children,
  headerContent,
  buttonTitle,
  className,
  onSubmit,
  hideBackButton,
}) => {
  return (
    <div>
      {!hideBackButton && <BackButton />}
      <div
        className={`flex flex-col w-[500px] rounded-[18px] overflow-hidden border border-primary-color ${className}`}
      >
        <div className="mb-2 text-left w-full flex justify-between px-3 py-1 border-b border-primary-color">
          {headerContent}
        </div>
        {children}
        {buttonTitle && (
          <button
            className="bg-primary-color mt-auto p-0 m-0 rounded-b-[18px] w-full h-[38px] text-black text-[20px] font-bold"
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
