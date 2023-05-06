import React from "react";

const Button = ({ title, onClick, className, type }) => {
  return (

      <button onClick={onClick} type={type} className={`py-[.6rem] px-[.8rem] font-medium text-[18px] rounded-[10px] ${className}`}>{title}</button>
  );
};

export default Button;
