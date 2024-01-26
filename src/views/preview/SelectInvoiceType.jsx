import React from "react";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { RiRadioButtonFill } from "react-icons/ri";

const SelectInvoiceDesignType = ({
  invoiceDesignType,
  onInvoiceDesignClicked,
  InvoiceDesignTypes,
}) => {
  return (
    <div>
    <p className="mb-2 text-[22px]">Select invoice design:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
        {InvoiceDesignTypes.map((type, idx) => (
          <div
            className={`${
              invoiceDesignType === type.value
                ? "bg-[#E9EFFF] border-[#275FFF]"
                : "border-[#E0E0E0]  bg-[#fff]"
            } rounded-[6px] border-2 cursor-pointer flex gap-4 justify-between items-center py-[16px] px-[24px]`}
            key={idx}
            onClick={() => onInvoiceDesignClicked(type)}
          >
            <div>
              <p className="font-[500] text-[#000000] text-[24px] my-[8px]">
                {type.name}
              </p>
              {/* <p className="text-[#828282] text-[14px] font-[400]">
                {type.description}
              </p> */}
            </div>
            {invoiceDesignType === type.value ? (
              <div className="">
                <RiRadioButtonFill color="#275FFF" fontSize="24px" />
              </div>
            ) : (
              <div>
                <MdRadioButtonUnchecked color="#828282" fontSize="24px" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectInvoiceDesignType;
