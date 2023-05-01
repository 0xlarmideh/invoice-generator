import React from "react";

const TextArea = ({ title, type, name, value, onChange }) => {
  return (
    <div className="flex flex-col">
      <label className="text-[1.1rem] font-medium py-[.4rem] text-slate-500">
        {title}
      </label>
      <textarea
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="font-medium text-[1.3rem] py-2 px-4 border-[2px] border-slate-200 focus:outline-none focus:border-green-300 rounded-[10px] "
      />
    </div>
  );
};

export default TextArea;
