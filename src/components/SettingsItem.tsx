import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  handleClick: () => void;
  text: string;
  title: string;
}

const SettingsItem: React.FC<ButtonProps> = ({
  handleClick,
  title,
  text,
  className = "",
  ...rest
}) => {
  return (
    <div
      className={`pl-4 justify-start rounded-full border border-light-green text-light-green text-[20px] h-[36px] bg-transparent ${className} m-[3px] relative flex items-center`}
      {...rest}
    >
      <div className="mb-0 pb-0">{title}</div>
      <div className="mb-0 pb-0 font-[200] pl-3">{text}</div>

      <button
        className="font-times text-3xl p-0 pb-1 m-0 text-light-green border-light-green absolute right-0 flex items-center justify-center bg-transparent rounded-full h-[36px] w-[36px] font-[400] focus:outline-none focus:ring-2 focus:ring-light-green focus:ring-offset-0"
        onClick={handleClick}
      >
        {`>`}
      </button>
    </div>
  );
};

export default SettingsItem;
