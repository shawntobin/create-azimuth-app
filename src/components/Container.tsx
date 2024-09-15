import React from "react";
import Navbar from "./Navbar.tsx";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <>
      <div className="fixed bg-base-color text-primary-color top-0 left-0 h-screen w-screen">
        <div className="absolute left-0 right-0">
          <Navbar />
        </div>
        <div className={`flex flex-col h-full`}>
          <div className="flex-grow flex flex-col items-center justify-center h-full pt-[0px]">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Container;
