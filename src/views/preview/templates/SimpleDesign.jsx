import React from "react";
import dayjs from "dayjs";

const SimpleDesign = ({ formData, totalAmount }) => {
  return (
    <div>
      {" "}
      <div class="py-10 h-full">
        <div className="flex flex-col justify-between">
          <div>
            <div class="mx-8 rounded-t-[12px] bg-[#F6F8FC] pt-[30px] pb-[16px] text-center">
              <p class="text-[14px] text-[#868DA6] font-[600]">
                {formData.recipientName}
                <span class="font-[400] text-[12px]">
                  {" "}
                  / {formData.recipientEmail}
                </span>
              </p>
            </div>
            <div
              class="rounded-[20px] p-8 bg-[#3362CC] mb-8 flex justify-between"
              style={{ boxShadow: "0px 3px 12px 0px rgba(35, 136, 255, 0.33)" }}
            >
              <div class="text-white">
                <p class="text-[10px] mb-[6px] ">INVOICE TO:</p>
                <p class="text-[18px] mb-[6px] font-[600] ">
                  {formData.clientName}
                </p>
                <p class="text-[12px] mb-[6px] leading-[10px]">
                  {formData.clientEmail}
                </p>
                <p class="text-[12px] max-w-[200px] leading-[14px]">
                  {formData.billedTo}
                </p>
              </div>
              <div
                style={{
                  boxShadow:
                    "0px 1px 3px 0px rgba(25, 33, 61, 0.05), 0px 2px 8px 0px rgba(25, 33, 61, 0.04)",
                }}
                class="p-3 bg-[#fff] rounded-[10px]"
              >
                <p class="text-[10px] text-[#868DA6]">AMOUNT DUE</p>
                <p class="text-[27px] font-[600] text-[#19213D]">
                  {formData.currency} {totalAmount}
                </p>
                <p class="text-[10px] text-[#868DA6]">
                  {dayjs(formData.issuedOn).format("MMMM D, YYYY")}
                </p>
              </div>
            </div>

            <div>
              <p class="ml-4 text-[12px] mb-1 text-[#868DA6]">
                INVOICE DETAILS
              </p>
              <div
                class="flex justify-between p-4 rounded-[10px]"
                style={{
                  border: "0.6px solid #ebeff6",
                  boxShadow:
                    "0px 1px 3px 0px rgba(25, 33, 61, 0.05), 0px 2px 8px 0px rgba(25, 33, 61, 0.04)",
                }}
              >
                <div>
                  <p class="text-[12px] mb-1 text-[#868DA6]">INVOICE NUMBER</p>
                  <p class="text-[14px] font-[600] text-[#19213D]">
                    {formData.invoiceNumber}
                  </p>
                </div>
                <div>
                  <p class="text-[12px] mb-1 text-[#868DA6]">ISSUED</p>
                  <p class="text-[14px] font-[600] text-[#19213D]">
                    {dayjs(formData.issuedOn).format("MMMM D, YYYY")}
                  </p>
                </div>
                <div>
                  <p class="text-[12px] mb-1 text-[#868DA6]">DUE DATE</p>
                  <p class="text-[14px] font-[600] text-[#19213D]">
                    {dayjs(formData.dueOn).format("MMMM D, YYYY")}
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-6">
              <table class="mb-[54px] min-w-full">
                <thead>
                  <tr class="">
                    <th
                      scope="col"
                      class="py-3 px-4 text-[#868DA6] text-left text-[14px] font-[500]"
                    >
                      DESCRIPTION
                    </th>
                    <th
                      scope="col"
                      class="py-3 px-4 text-[#868DA6] text-left text-[14px] font-[500]"
                    >
                      QTY
                    </th>
                    <th
                      scope="col"
                      class="py-3 px-4 text-[#868DA6] text-left text-[14px] font-[500]"
                    >
                      PRICE
                    </th>
                    <th
                      scope="col"
                      class="py-3 px-4 text-[#868DA6] text-left text-[14px] font-[500]"
                    >
                      TOTAL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formData.items.map((item, idx) => (
                    <tr
                      key={idx}
                      style={{
                        borderBottom: "0.6px solid #ebeff6",
                        backgroundColor: "#ebeff6",
                      }}
                    >
                      <td class="text-[#5D6481] text-[14px] font-[600] p-4">
                        {item.item}
                      </td>
                      <td class="text-[#5D6481] text-[14px] font-[600] p-4">
                        {item.quantity}
                      </td>
                      <td class="text-[#5D6481] text-[14px] font-[600] p-4">
                        {item.price}
                      </td>
                      <td class="text-[#5D6481] text-[14px] font-[600] p-4">
                        {formData.currency} {item.totalPrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div class="flex mb-8 justify-end">
                <div>
                  <p class="text-right text-[#868DA6] text-[10px]">
                    TOTAL AMOUNT
                  </p>
                  <p class="text-[24px] text-[#3362CC] font-bold">
                    {formData.currency} {totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="py-4 px-5 w-full mb-5 border border-[0.6px] border-[#ebeff6] rounded-[10px]">
            <p className="text-[#5d6481] text-[12px] font-[600]">Notes:</p>
            <p className="text-[#5d6481] text-[10px] font-[400]">
              {formData.notes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleDesign;
