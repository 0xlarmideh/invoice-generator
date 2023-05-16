import React from "react";

const Button = ({ title, onClick, className, type }) => {
  return (

      <button onClick={onClick} type={type} className={`py-[.7rem] px-[.8rem] font-regular text-[18px] rounded-[8px] ${className}`}>{title}</button>
  );
};

export default Button;
