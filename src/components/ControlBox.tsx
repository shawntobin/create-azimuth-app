import React from "react";

interface ControlBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  headerContent: React.ReactNode;
  buttonTitle: string;
  className?: string;
  onSubmit: () => void;
}

const ControlBox: React.FC<ControlBoxProps> = ({
  children,
  headerContent,
  buttonTitle,
  className,
  onSubmit,
}) => {
  return (
    <div
      className={`flex flex-col w-[500px] rounded-[18px] overflow-hidden border border-light-green ${className}`}
    >
      <div className="mb-2 text-left w-full flex justify-between p-2 border-b border-light-green">
        {headerContent}
      </div>
      {children}
      <button
        className="bg-light-green mt-auto p-0 m-0 rounded-b-[18px] w-full h-[38px] text-black text-[20px] font-bold"
        onClick={onSubmit}
      >
        {buttonTitle}
      </button>
    </div>
  );
};

export default ControlBox;
