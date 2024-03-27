import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  ...rest
}) => {
  return (
    <div
      className={`fixed top-0 left-0 h-screen w-screen bg-dark-green text-light-green flex flex-col justify-center items-center ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Container;
