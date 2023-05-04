import { Field } from "formik";
import React from "react";

const SelectField = ({ title, name, obj }) => {
  return (
    <div className="flex flex-col">
      <label className="text-[20px] font-regular py-[.1rem] text-text">
        {title}
      </label>
      <Field
        as="select"
        name={name}
        id="currency"
        className="font-regular font-grotesk text-[16px] text-text p-[12px] border-[2px] border-slate-200 focus:outline-none focus:border-cyan-300 rounded-[10px]"
      >
        {Object.keys(obj).map((objitem) => {
          return (
            <option key={objitem} value={objitem}>
              {objitem}
            </option>
          );
        })}
      </Field>
    </div>
  );
};

export default SelectField;
