import { Field } from "formik";
import React from "react";

const SelectField = ({ title, name, obj }) => {
  return (
    <div className="flex flex-col">
      <label className="text-[1.1rem] font-medium py-[.4rem] text-slate-500">
        {title}
      </label>
      <Field
        as="select"
        name={name}
        id="currency"
        className="font-medium my-[.8rem] text-[1rem] py-2 px-4 border-[2px] border-slate-200 focus:outline-none focus:border-cyan-300 rounded-[10px]"
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
