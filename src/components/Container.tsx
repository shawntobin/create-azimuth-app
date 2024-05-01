import React from "react";
import { BellIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import UrbitSymbols from "./UrbitSymbols";
import BackButton from "./BackButton";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  headerText?: string; // to be changed to automatically get the header text from the route
  symbols?: boolean;
  back?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  headerText = "",
  symbols = true,
  back = true,
  ...rest
}) => {
  return (
    <div className="fixed bg-dark-green text-light-green top-0 left-0 h-screen w-screen">
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center m-8 font-bold">
        <div className="hover:bg-light-green hover:text-dark-green p-2 rounded-full">
          <QuestionMarkCircleIcon className="h-6 w-6" />
        </div>
        <div className="flex-grow text-center">{headerText}</div>
        <div className="hover:bg-light-green hover:text-dark-green p-2 rounded-full">
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
