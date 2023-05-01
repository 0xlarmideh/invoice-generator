import React from "react";

// Main heading component
export const Heading = ({ title, className }) => {
  return <h1 className={`text-3xl font-medium ${className}`}>{title}</h1>;
};

// SubHeading component
export const SubHeading = ({ title, className }) => {
  return (
    <h2 className={`text-3xl font-bold ${className}`}>{title}</h2>
  );
};

//Small heading component
export const SmallHeading = ({ title, className }) => {
  return <h3 className={`text-[1.1rem] font-bold ${className}`}>{title}</h3>;
};

// Regular P tag
export const Paragraph = ({ title, className }) => {
  return <p className={`text-md paragraph ${className}`}>{title}</p>;
};
