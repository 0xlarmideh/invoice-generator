import { Field, ErrorMessage } from "formik";

export const CustomInput = ({ title, type, name, error, ...restProps }) => {
  return (
    <div className="flex w-full flex-col py-[10px]">
      <label className="text-[20px] tracking-wide font-regular py-[.1rem] text-text">
        {title}
      </label>
      <Field
        type={type}
        name={name}
        error={error}
        {...restProps}
        className="font-regular font-grotesk text-[16px] text-text p-[12px] border-[2px] border-slate-200 focus:outline-none focus:border-cyan-300 rounded-[10px] "
      />
      <ErrorMessage
        component="div"
        className="text-red-700 text-[16px] font-semibold"
        name={name}
      />
    </div>
  );
};

export const Button = ({ title, className, ...restProps }) => {
  return (
    <button
      {...restProps}
      className={`py-[.7rem] px-[.8rem] font-regular text-[18px] rounded-[8px] ${className}`}
    >
      {title}
    </button>
  );
};

export const SelectField = ({ title, name, obj }) => {
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
        <option value="">Select currency</option>
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

export const TextArea = ({ title, type, name, value, onChange }) => {
  return (
    <div className="flex flex-col">
      <label className="text-[20px] font-regular py-[.1rem] text-text">
        {title}
      </label>
      <textarea
        rows="5"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="font-regular font-grotesk text-[16px] text-text p-[12px] border-[2px] border-slate-200 focus:outline-none focus:border-cyan-300 rounded-[10px]"
      />
    </div>
  );
};
