import React from 'react'

const InputField = ({title, value, onChange, type, name, error}) => {
  return (
    <div className="flex flex-col">
      <label className="text-[.9rem] font-medium py-[.3rem] text-slate-500">
        {title}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        error={error}
        onChange={onChange}
        className="font-medium text-[.9rem] py-2 px-2 border-[2px] border-slate-200 focus:outline-none focus:border-cyan-300 rounded-[10px] "
      />
    </div>
  );
}

export default InputField