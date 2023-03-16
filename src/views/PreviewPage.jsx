import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Heading, SmallHeading, Paragraph } from "../components/Typography";
import Button from "../components/Button";

import jsPDF from "jspdf";

function PreviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [])

  if (!formData) {
    navigate("/");
    return null;
  }

  const handleEditClick = () => {
    // window.history.back()
    navigate('/edit', {state: {formData} });
  };

  const handleDownloadClick = () => {
    navigate('/downloaded')
    setTimeout(() => {
      const doc = new jsPDF();
      // add title
      doc.setFontSize(22);
      doc.text("Invoice", 105, 20, { align: "center" });

      // add recipient Name
      doc.setFontSize(14);
      doc.text(`To: ${formData.recipientName}`, 20, 40);

      // add Client Name
      doc.setFontSize(14);
      doc.text(`To: ${formData.clientName}`, 20, 40);

      // add recipient email
      doc.setFontSize(14);
      doc.text(`To: ${formData.recipientEmail}`, 20, 40);

      // add project description
      doc.setFontSize(14);
      doc.text(`Project Description: ${formData.projectDescription}`, 20, 50);

      // add issued on
      doc.setFontSize(12);
      doc.text(`Issued On: ${formData.issuedOn}`, 20, 60);

      // add due on
      doc.setFontSize(12);
      doc.text(`Due On: ${formData.dueOn}`, 105, 60, { align: "right" });

      // add bill from
      doc.setFontSize(12);
      doc.text(`From: ${formData.billFrom}`, 20, 70);

      // add bill to
      doc.setFontSize(12);
      doc.text(`To: ${formData.billTo}`, 105, 70, { align: "right" });

      // add items
      doc.setFontSize(12);
      doc.text("Items", 20, 80);
      let y = 90;
      formData.items.forEach((item) => {
        doc.text(
          `${item.item}: ${item.quantity} x ${item.price} = ${item.totalPrice} ${formData.currency}`,
          20,
          y
        );
        y += 10;
      });

      // add notes
      doc.setFontSize(12);
      doc.text(`Notes: ${formData.notes}`, 20, y + 10);

      doc.save("invoice.pdf");
    }, 1000);
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
          <Paragraph className="text-[1.2rem]" title="Description" />
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

export default PreviewPage;
