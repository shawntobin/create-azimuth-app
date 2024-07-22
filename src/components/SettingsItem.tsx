import React, { ButtonHTMLAttributes } from "react";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { copy } from "../utils/helper";
import { formatAddress } from "../utils/address";
import { isAddress } from "web3-validator";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  handleClick: () => void;
  text: React.ReactNode;
  title: string;
}

const SettingsItem: React.FC<ButtonProps> = ({
  handleClick,
  title,
  text,
  className = "",
}) => {
  return (
    <div
      className={`pl-4 justify-start rounded-full border border-primary-color text-primary-color text-[20px] h-[36px] bg-transparent ${className} m-[3px] relative flex items-center`}
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

      <div
        className="cursor-pointer font-[600] text-[28px] pb-1 pl-0.5 -mr-0.5 bg-primary-color text-base-color border-primary-color absolute right-0 flex items-center justify-center rounded-full h-[36px] w-[36px] focus:outline-none focus:bg-transparent hover:bg-light-gray hover:border-primary-color"
        onClick={handleClick}
      >
        {`>`}
      </div>
      {/* <div className="font-[200] text-[50px] pb-2 pl-0.5 bg-primary-color text-base-color border-primary-color flex items-center justify-center rounded-full h-[36px] w-[36px]">
        {`>`}
      </div> */}
    </div>
  );
};

export default SettingsItem;
