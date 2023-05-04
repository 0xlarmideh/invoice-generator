import React from 'react'

const InputField = ({title, value, onChange, type, name, error}) => {
  return (
    <div className="flex flex-col">
      <label className="text-[20rem] font-medium py-[.3rem] font-regular text-text">
        {title}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        error={error}
        onChange={onChange}
        className="font-regular font-grotesk text-[16px] text-text p-[12px] border-[2px] border-slate-200 focus:outline-none focus:border-cyan-300 rounded-[10px]"
      />
    </div>
  );
}

export default InputField