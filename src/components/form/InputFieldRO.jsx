import React from 'react'

const InputFieldRO = ({title, type, name, value, onChange}) => {
  return (
    <div className="flex flex-col">
      <label className="text-[20px] font-regular py-[.1rem] text-text">
        {title}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        readOnly
        className="font-regular font-grotesk text-[16px] text-text p-[12px] border-[2px] border-slate-200 focus:outline-none focus:border-cyan-300 rounded-[10px]"
      />
    </div>
  );
}

export default InputFieldRO