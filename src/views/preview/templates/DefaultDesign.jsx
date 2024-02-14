import React from 'react'
import { Paragraph, SmallHeading } from '../../../components/typography/Typography'

const DefaultDesign = ({formData, totalAmount}) => {
  return (
    <div><div className="text-[24px] pb-[16px] ">
      Invoice Number:{" "}
      <span className="font-medium text-blue">{formData?.invoiceNumber}</span>
    </div>

      <Paragraph
        title={formData?.notes}
        className="border-b-2 border-slate-100 text-text pb-[2rem] mb-[1.2rem] "
      />

      <div className="grid gap-6 grid-cols-2 mb-[1rem]">
        <div>
          <Paragraph
            title="Bill From"
            className="text-slate-500 pb-[14px] font-medium "
          />
          <div className="ml-[5px] ">
            <SmallHeading
              title={formData?.recipientName}
              className="pb-[14px]"
            />
            <Paragraph
              title={formData?.billFrom}
              className="text-slate-500 pb-[18px]"
            />
          </div>
          <div>
            <Paragraph
              title="Issued On"
              className="text-slate-500 pb-[14px] font-medium"
            />
            <div className="ml-[5px] ">
              <SmallHeading title={formData?.issuedOn} className="pb-[14px]" />
            </div>
          </div>
        </div>
        <div className="justify-end flex">
          <div>
            <Paragraph
              title="Bill To"
              className="text-slate-500 pb-[14px] font-medium"
            />
            <div className="ml-[5px] ">
              <SmallHeading title={formData?.clientName} className="pb-[14px]" />
              <Paragraph
                title={formData?.billTo}
                className="text-slate-500 pb-[18px]"
              />
            </div>
            <div>
              <Paragraph
                title="Due On"
                className="text-slate-500 pb-[14px] font-medium"
              />
              <div className="ml-[5px] ">
                <SmallHeading title={formData?.dueOn} className="pb-[14px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-[1.2rem] pt-[.4rem] text-[20px] font-medium ">
        Invoice Items
      </div>
      <div>
        <div className="grid grid-cols-[56%_15%_15%_14%] py-[.4rem] px-[.35rem] text-slate-500 ">
          <Paragraph title="Description" />
          <Paragraph title="Price" />
          <Paragraph title="Qty" />
          <Paragraph title="Total " />
        </div>
        {formData?.items?.map((item, index) => (
          <div
            className="grid grid-cols-[56%_15%_15%_14%] py-[.8rem] px-[.35rem]"
            key={index}
          >
            <SmallHeading title={item.item} />
            <SmallHeading title={item.price} />
            <SmallHeading title={item.quantity} />
            <SmallHeading title={item.totalPrice + formData?.currency} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[56%_30%_14%] py-[.4rem] px-[.35rem] font-medium ">
        <span></span>
        <SmallHeading
          className="text-slate-500 !font-bold text-[1.2rem]"
          title="Total"
        />
        <SmallHeading
          className="text-blue !font-bold text-[1.2rem]"
          title={`${totalAmount}` + " " + `${formData?.currency}`}
        />
      </div></div>
  )
}

export default DefaultDesign