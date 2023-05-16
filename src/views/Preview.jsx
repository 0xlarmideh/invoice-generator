import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SmallHeading, Paragraph } from "../components/Typography";
import Button from "../components/form/Button";
import {jsPDFInvoiceTemplate} from "../components/jspdf/jsPDFTemplate.js";
import { OutputType } from "../components/jsPdf/outputType";

function Preview() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (!formData) {
    navigate("/");
    return null;
  }

  const handleEditClick = () => {
    // window.history.back()
    navigate("/invoice");
  };

  let number = 0;
  let totalAmount = 0;
  formData.items.forEach((item) => {
    number += 1;
    totalAmount += item.totalPrice;
  });

 
  // PDF Section
  var props = {
    outputType: OutputType.Save,
    returnJsPDFDocObject: true,
    fileName: "Invoice",
    orientationLandscape: false,
    compress: true,
    stamp: {
      inAllPages: true, //by default = false, just in the last page
      src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
      type: "JPG", //optional, when src= data:uri (nodejs case)
      width: 20, //aspect ratio = width/height
      height: 20,
      margin: {
        top: 0, //negative or positive num, from the current position
        left: 0, //negative or positive num, from the current position
      },
    },

    business: {
      label: "Invoice issued from:",
      name: `${formData.recipientName}`,
      address: `${formData.billFrom}`,
      email: `${formData.recipientEmail}`,
    },

    contact: {
      label: "Invoice issued for:",
      name: `${formData.clientName}`,
      address: `${formData.billTo}`,
      email: `${formData.clientEmail}`,
    },

    invoice: {
      label: `Invoice #: `,
      num: `${formData.invoiceNumber}`,
      invDate: `${formData.issuedOn}`,
      invGenDate: `${formData.dueDate}`,
      headerBorder: false,
      tableBodyBorder: false,
      header: [
        {
          title: "#",
          style: {
            width: 10,
          },
        },
        {
          title: "Title",
          style: {
            width: 30,
          },
        },
        {
          title: "Description",
          style: {
            width: 80,
          },
        },
        { title: "Price" },
        { title: "Quantity" },
        // { title: "Unit" },
        { title: "Total" },
      ],
      table: Array.from(Array(number), (item, index) => [
        index + 1,
        `${formData.items[index].item}`,
        `${formData.items[index].desc}`,
        `${formData.items[index].price} `,
        `${formData.items[index].quantity}`,
        `${formData.items[index].totalPrice} ${formData.currency}`,
      ]),
      additionalRows: [
        {
          col1: "Total:",
          col2: `${totalAmount} ${formData.currency}`,
          col3: "ALL",
          style: {
            fontSize: 14, //optional, default 12
          },
        },
      ],
      invDescLabel: "Invoice Note",
      invDesc: `${formData?.notes}`,
    },
    footer: {
      text: "The invoice is created on a computer and is valid without the signature and stamp.",
    },
    pageEnable: true,
    pageLabel: "Page ",
  };

  const handleDownloadClick = () => {
    var pdfObject = jsPDFInvoiceTemplate(props);
    // Navigate to download screen
    navigate("/downloaded");
    setTimeout(() => {

    }, 1500);
  };

  return loading ? (
    <div className="loading-spinner">
      <span className="loader"></span>
    </div>
  ) : (
    <div className="max-w-[900px] mx-auto pb-[4rem] p-[20px] text-text shadow">
      <div className="text-[24px] pb-[16px] ">
        Invoice Number:{" "}
        <span className="font-medium text-blue">{formData.invoiceNumber}</span>
      </div>

      <Paragraph
        title={formData.notes}
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
              title={formData.recipientName}
              className="pb-[14px]"
            />
            <Paragraph
              title={formData.billFrom}
              className="text-slate-500 pb-[18px]"
            />
          </div>
          <div>
            <Paragraph
              title="Issued On"
              className="text-slate-500 pb-[14px] font-medium"
            />
            <div className="ml-[5px] ">
              <SmallHeading title={formData.issuedOn} className="pb-[14px]" />
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
              <SmallHeading title={formData.clientName} className="pb-[14px]" />
              <Paragraph
                title={formData.billTo}
                className="text-slate-500 pb-[18px]"
              />
            </div>
            <div>
              <Paragraph
                title="Due On"
                className="text-slate-500 pb-[14px] font-medium"
              />
              <div className="ml-[5px] ">
                <SmallHeading title={formData.dueOn} className="pb-[14px]" />
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
        {formData.items.map((item, index) => (
          <div
            className="grid grid-cols-[56%_15%_15%_14%] py-[.8rem] px-[.35rem]"
            key={index}
          >
            <SmallHeading title={item.item} />
            <SmallHeading title={item.price} />
            <SmallHeading title={item.quantity} />
            <SmallHeading title={item.totalPrice + formData.currency} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[56%_30%_14%] py-[.4rem] px-[.35rem] font-medium ">
        <span></span>
        <SmallHeading
          className="text-slate-500 text-[1.2rem]"
          title="Total"
        />
        <SmallHeading
          className="text-blue text-[1.2rem]"
          title={`${totalAmount}` + " " + `${formData.currency}`}
        />
      </div>

      <div className="my-[5rem]"></div>
      <div className="flex justify-between">
        <Button
          onClick={handleEditClick}
          title="Edit"
          className="text-text"
        />
        <Button
          onClick={handleDownloadClick}
          title="Download PDF"
          className="bg-blue text-white"
        />
      </div>
    </div>
  );
}

export default Preview;
