import React from "react";
import { BellIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import UrbitSymbols from "./UrbitSymbols";
import BackButton from "./BackButton";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import IdDropdown from "./IdDropdown";
import Dropdown from "./Dropdown";
import * as ob from "urbit-ob";
import { useNavigate } from "react-router-dom";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  headerText?: string; // to be changed to automatically get the header text from the route?
  symbols?: boolean;
  dropdown?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  headerText = "",
  symbols = true,
  dropdown = false,
  ...rest
}) => {
  const navigate = useNavigate();
  return (
    <div className="fixed bg-base-color text-primary-color top-0 left-0 h-screen w-screen">
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center m-8 font-bold">
        <div className="hover:bg-primary-color hover:text-base-color p-2 rounded-full">
          <QuestionMarkCircleIcon className="h-6 w-6" />
        </div>
        <div className="text-center justify-center items-center flex text-[20px]">
          {headerText}
          {dropdown && <Dropdown />}
        </div>

        <div
          className="hover:bg-primary-color hover:text-base-color p-2 rounded-full cursor-pointer"
          onClick={() => navigate("/history")}
        >
          <BellIcon className="h-6 w-6" />
        </div>
      </div>
      <div className={`flex flex-col h-full ${className}`} {...rest}>
        <div className="flex-grow flex flex-col items-center justify-center">
          {children}
        </div>
        {symbols && (
          <div className="p-8">
            <UrbitSymbols />
          </div>
        )}
      </div>
    </div>
  );
};

export default Container;
