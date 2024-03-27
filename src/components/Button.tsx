import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  handleClick: () => void;
  text: string;
  secondaryText?: string;
}

const Button: React.FC<ButtonProps> = ({
  handleClick,
  text,
  secondaryText = "",
  className = "",
  ...rest
}) => {
  const buttonClassName = `flex flex-col items-center justify-center px-8 py-2.5 rounded-full text-lg bg-light-green border-0 text-black ${className}`;

  return (
    <button onClick={handleClick} className={buttonClassName} {...rest}>
      <div className="mb-0 pb-0">{text}</div>
      {secondaryText && (
        <div className="text-sm mt-0 pt-0">{secondaryText}</div>
      )}
    </button>
  );
};

export default Button;
