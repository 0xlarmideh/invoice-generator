import React from 'react'

const InputField = ({title, type, name, value, onChange}) => {
  return (
    <div className='flex flex-col'>
      <label className="text-[1rem] font-medium py-[.4rem] text-slate-500">{title}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="font-bold text-[1.5rem] px-4 border-2 border-slate-500 rounded "
      />
    </div>
  );
}

export default InputField