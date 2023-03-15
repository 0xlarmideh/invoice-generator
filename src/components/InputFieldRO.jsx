import React from 'react'

const InputFieldRO = ({title, type, name, value, onChange}) => {
  return (
    <div className="flex flex-col">
      <label className="text-[1.1rem] font-medium py-[.4rem] text-slate-500">
        {title}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        readOnly
        className="font-medium text-[1.3rem] py-2 px-4 border-[2px] border-slate-200 bg-slate-100 outline-none  rounded-[10px] "
      />
    </div>
  );
}

export default InputFieldRO