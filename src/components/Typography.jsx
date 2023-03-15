import React from "react";

// Main heading component
export const Heading = ({ title, className }) => {
  return <h1 className={`text-4xl font-bold ${className}`}>{title}</h1>;
};

// SubHeading component
export const SubHeading = ({ title, className }) => {
  return (
    <h2 className={`text-3xl font-bold ${className}`}>{title}</h2>
  );
};

//Small heading component
export const SmallHeading = ({ title }) => {
  return <h3 className="text-xl font-bold">{title}</h3>;
};

// Regular P tag
export const Paragraph = ({ title }) => {
  return <p className="text-md my-2 paragraph">{title}</p>;
};
