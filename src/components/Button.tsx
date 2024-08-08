import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  handleClick: () => void;
  text: string;
}

const Button: React.FC<ButtonProps> = ({
  handleClick,
  text,
  className = "",
  ...rest
}) => {
  const buttonClassName = `flex items-center justify-center rounded-[10px] border border-primary-color text-primary-color text-[20px] h-[36px] bg-transparent ${className}`;

  return (
    <button onClick={handleClick} className={buttonClassName} {...rest}>
      <div className="mb-0 pb-0">{text}</div>
    </button>
  );
};

export default Button;
