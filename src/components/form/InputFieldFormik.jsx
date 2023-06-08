import React from 'react'
import { Field, ErrorMessage } from "formik";


const InputFieldFormik = ({title, type, name, error,}) => {
  return (
    <div className="flex flex-col py-[10px]">
      <label className="text-[20px] tracking-wide font-regular py-[.1rem] text-text">
        {title}
      </label>
      <Field
        type={type}
        name={name}
        error={error}
        className="font-regular font-grotesk text-[16px] text-text p-[12px] border-[2px] border-slate-200 focus:outline-none focus:border-cyan-300 rounded-[10px] "
      />
      <ErrorMessage
        component="div"
        className="text-red-900 text-[13px] font-semibold"
        name={name}
      />
    </div>
  );
}

export default InputFieldFormik