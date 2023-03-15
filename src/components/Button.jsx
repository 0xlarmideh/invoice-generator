import React from "react";

const Button = ({ title, onClick, className, type }) => {
  return (

      <button onClick={onClick} type={type} className={`py-[.6rem] px-[.8rem]  text-white rounded-[10px] ${className}`}>{title}</button>

  );
};

export default Button;
