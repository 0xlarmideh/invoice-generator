import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Heading, SmallHeading, Paragraph } from "../components/Typography";
import Button from "../components/Button";
import jsPDFInvoiceTemplate from "../components/jsPDFTemplate";
import { OutputType, jsPDF } from "../components/outputType";
// import jsPDF from "jspdf";

// import jsPDF from "jspdf";
// import jsPDFInvoiceTemplate, {
//   OutputType,
//   jsPDF,
// } from "jspdf-invoice-template";

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
    number += 1
    totalAmount += item.totalPrice;
  });

  // Create two new variables and use it to save data to storage after click
  let new_data = formData;
  let old_data = [];
  let oldData = JSON.parse(localStorage.getItem("savedItems"));
  if (oldData == undefined) {
    oldData = null;
  }
  if (oldData) {
    old_data = oldData;
  }
  // Push the current value gotten from location state to the old data
  old_data.push(new_data);

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
      label: "Invoice #: ",
      num: 19,
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
        `${formData.items[index].price}`,
        `${formData.items[index].quantity}`,
        `${formData.items[index].totalPrice}`,
      ]),
      additionalRows: [
        {
          col1: "Total:",
          col2: `${totalAmount}`,
          col3: "ALL",
          style: {
            fontSize: 14, //optional, default 12
          },
        },
        {
          col1: "VAT:",
          col2: "20",
          col3: "%",
          style: {
            fontSize: 10, //optional, default 12
          },
        },
        {
          col1: "SubTotal:",
          col2: "116,199.90",
          col3: "ALL",
          style: {
            fontSize: 10, //optional, default 12
          },
        },
      ],
      invDescLabel: "Invoice Note",
      invDesc:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
    },
    footer: {
      text: "The invoice is created on a computer and is valid without the signature and stamp.",
    },
    pageEnable: true,
    pageLabel: "Page ",
  };


  const handleDownloadClick = () => {
    var pdfObject = jsPDFInvoiceTemplate(props);
    pdfObject.blob;
    pdfObject.jsPDFDocObject.save();
    console.log("Created", pdfObject)
    // console.log(old_data);
    // Update localStorage state
    localStorage.setItem("savedItems", JSON.stringify(old_data));

    // Navigate to download screen
    navigate("/downloaded");
    setTimeout(() => {
      // Create PDF instance with template
    }, 1500);
  };

  return loading ? (
    <div className="loading-spinner">
      <span className="loader"></span>
    </div>
  ) : (
    <div>
      <Heading
        title="Invoice Preview"
        className="border-b-2 border-slate-100 pb-[2rem] mb-[1.2rem] "
      />
      <div className="flex gap-6 mb-[1rem]">
        <div>
          <Paragraph title="Issued On" className="text-slate-500" />
          <SmallHeading title={formData.issuedOn} />
        </div>
        <div>
          <Paragraph title="Due On" className="text-slate-500" />
          <SmallHeading title={formData.dueOn} />
        </div>
      </div>
      <div className="grid gap-6 grid-cols-2 mb-[1rem]">
        <div>
          <Paragraph title="Bill From" className="text-slate-500" />
          <SmallHeading title={formData.recipientName} />
          <Paragraph title={formData.billFrom} className="text-slate-500" />
        </div>
        <div>
          <Paragraph title="Bill To" className="text-slate-500" />
          <SmallHeading title={formData.clientName} />
          <Paragraph title={formData.billTo} className="text-slate-500" />
        </div>
      </div>
      <SmallHeading className="mb-[1.2rem] pt-[.4rem] " title="Invoice Items" />
      <div className="border-slate-200 border-2 rounded-[10px]">
        <div className="grid grid-cols-[51%_15%_10%_19%] py-[.4rem] px-[.35rem] text-slate-500 bg-slate-100 ">
          <Paragraph title="Description" />
          <Paragraph title="Price" />
          <Paragraph title="Qty" />
          <Paragraph title="Total " />
        </div>
        {formData.items.map((item, index) => (
          <div
            className={`grid grid-cols-[51%_15%_10%_19%] py-[.8rem] px-[.35rem] ${
              index !== formData.items.length - 1 && "border-b-2"
            } `}
            key={index}
          >
            <SmallHeading title={item.item} />
            <SmallHeading title={item.price} />
            <SmallHeading title={item.quantity} />
            <SmallHeading title={item.totalPrice + formData.currency} />
            {/* {item.item}: {item.quantity} x {item.price} = {item.totalPrice}
            {formData.currency} */}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[51%_26%_19%] py-[.4rem] px-[.35rem] ">
        <Paragraph className="text-slate-500" title={formData.notes} />
        <SmallHeading
          className="text-slate-500 text-[1rem]"
          title="Total Amount"
        />
        {/* <SmallHeading title={`${form}`} /> */}
      </div>

      <div className="my-[2rem]"></div>
      <div className="flex gap-2">
        <Button
          onClick={handleEditClick}
          title="Edit"
          className="bg-slate-600"
        />
        <Button
          onClick={handleDownloadClick}
          title="Download PDF"
          className="bg-purple-800"
        />
      </div>
    </div>
  );
}

export default Preview;
