import React, { ButtonHTMLAttributes } from "react";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { copy } from "../utils/helper";
import { formatAddress } from "../utils/address";
import { isAddress } from "web3-validator";

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
      className={`pl-4 justify-start rounded-full border border-primary-color text-primary-color text-[20px] h-[36px] bg-transparent ${className} m-[3px] relative flex items-center`}
      {...rest}
    >
      <div className="mb-0 pb-0">{title}</div>
      <div className="mb-0 pb-0 font-[200] pl-3">
        {isAddress(text) ? formatAddress(text) : text}
      </div>
      {isAddress(text) && (
        <button
          onClick={() => copy(text)}
          className="bg-transparent p-0 m-0 align-right absolute right-12"
        >
          <DocumentDuplicateIcon className="h-6 w-6 stroke-1" />
        </button>
      )}

      <button
        className="font-times text-3xl p-0 pb-1 m-0 text-primary-color border-primary-color absolute right-0 flex items-center justify-center bg-transparent rounded-full h-[36px] w-[36px] font-[400] focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-0"
        onClick={handleClick}
      >
        {`>`}
      </button>
    </div>
  );
};

export default SettingsItem;
