import React from "react";
import dayjs from "dayjs";

const MinimalistDesign = ({ formData, totalAmount }) => {
  return (
    <div>
      {" "}
      <div class="py-10 h-full">
        <div className="flex flex-col justify-between">
          <div>
            <div class="grid gap-4 grid-cols-[2fr,1.2fr] mb-8">
              <div class="rounded-[20px] relative overflow-hidden bg-[#3362CC] flex items-center h-full">
                <div class="text-white p-8">
                  <p class="text-[24px] mb-[6px] font-[600]">
                    {formData.recipientName}
                  </p>
                  <p class="text-[14px] mb-[6px] leading-[10px]">
                    {formData.recipientEmail}
                  </p>
                  <p class="text-[14px] leading-[14px]">{formData.billFrom}</p>
                </div>
                <div class="absolute right-0 top-0">
                  <img src="/bluesvg-biggest.svg" alt="svg" />
              </div>
              <div class="absolute right-0 bottom-0">
                <img src="/bluesvg-big.svg" alt="svg" />
              </div>
              <div class="absolute left-0 bottom-0">
                  <img src="/bluesvg-small.svg" alt="svg" />
              </div>
              </div>
              <div class="rounded-[20px] bg-[#EBEFF6] p-4">
                <div
                  style=
              {{boxShadow: "0px 1px 3px 0px rgba(25, 33, 61, 0.05), 0px 2px 8px 0px rgba(25, 33, 61, 0.04)"}}
            
                  class="p-3 bg-[#fff] rounded-[10px] mb-4"
                >
                  <p class="text-[10px] text-[#868DA6]">AMOUNT DUE</p>
                  <p class="text-[24px] font-[600] text-[#19213D]">
                    {formData.currency} {totalAmount}
                  </p>
                  <p class="text-[10px] text-[#868DA6]">
                    {dayjs(formData.issuedOn).format("MMMM D, YYYY")}
                  </p>
                </div>
                <div>
                  <p class="text-[10px] mb-[6px] text-[#868DA6]">INVOICE TO:</p>
                  <p class="text-[18px] mb-[6px] font-[600] text-[#19213D]">
                    {formData.clientName}
                  </p>
                  <p class="text-[12px] mb-[6px] text-[#868DA6] leading-[10px]">
                    {formData.clientEmail}
                  </p>
                  <p class="text-[12px] text-[#868DA6] leading-[14px]">
                    {formData.billTo}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p class="ml-4 text-[12px] mb-1 text-[#868DA6]">
                INVOICE DETAILS
              </p>
              <div
                class="flex justify-between p-4 rounded-[10px]"
                style=
            {{border: "0.6px solid #ebeff6",
            boxShadow: "0px 1px 3px 0px rgba(25, 33, 61, 0.05), 0px 2px 8px 0px rgba(25, 33, 61, 0.04)"
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
                  {formData.items?.map((item, idx) => (
                    <tr
                      key={idx}
                      style={{borderBottom: "0.6px solid #ebeff6", backgroundColor:"#ebeff6"}}
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
          <div className="py-4 px-5 w-full mb-5 border border-[0.6px] border-[#ebeff6] rounded-[10px]"
          >
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

export default MinimalistDesign;
