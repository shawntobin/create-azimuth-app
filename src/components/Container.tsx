import React from "react";
import {
  BellIcon,
  QuestionMarkCircleIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  headerText?: string; // Assume headerText is passed as a prop
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  headerText = "",
  ...rest
}) => {
  return (
    <div className="fixed bg-dark-green text-light-green top-0 left-0 h-screen w-screen">
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center m-8 font-bold">
        <div className="hover:bg-light-green hover:text-dark-green p-2 rounded-full">
          <QuestionMarkCircleIcon className="h-6 w-6" />
        </div>
        <div className="flex-grow text-center">{headerText}</div>{" "}
        <div className="hover:bg-light-green hover:text-dark-green p-2 rounded-full">
          <BellIcon className="h-6 w-6" /> {/* Right icon */}
        </div>
      </div>

      <div
        className={`h-screen w-screen flex flex-col justify-center items-center ${className}`}
        {...rest}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
