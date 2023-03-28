import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Heading, SmallHeading, Paragraph } from "../components/Typography";
import Button from "../components/Button";

import jsPDF from "jspdf";

function PreviewPage() {
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
    navigate("/edit", { state: { formData } });
  };

  // Create two new variables and use it to save data to storage after click
  let new_data = formData;
  let old_data = []
  let oldData = JSON.parse(localStorage.getItem("savedItems"));
  if (oldData == undefined){

     oldData = null
  }
  if(oldData){

    old_data = oldData
  }
  // Push the current value gotten from location state to the old data
  old_data.push(new_data);
  const handleDownloadClick = () => {
    console.log(old_data);
    // Update localStorage state
    localStorage.setItem('savedItems', JSON.stringify(old_data))

    // Navigate to download screen 
    navigate("/downloaded");
    setTimeout(() => {

      // Create document instance
      const doc = new jsPDF();
      doc.setFontSize(33);
      doc.text("Invoice", 105, 20, { align: "center" });

      doc.setFontSize(12);
      doc.setTextColor("blue");
      doc.text(`Billed From`, 20, 40);
      doc.text(`Billed To`, 120, 40);
      doc.text(`Issued On`, 20, 60);
      doc.text(`Due On`, 63, 60);
      doc.text(`Recipiend Add`, 106, 60);
      doc.text(`Client Add`, 152, 60);
      doc.text(`Notes`, 20, 170);

      doc.setFontSize(10);

      doc.text(`DESCRIPTION`, 20, 90);
      doc.text(`RATE`, 140, 90, { align: "right" });
      doc.text(`QTY`, 160, 90, { align: "right" });
      doc.text(`AMOUNT`, 190, 90, { align: "right" });

      doc.setTextColor("black");

      doc.setFontSize(17);
      doc.text(`${formData.recipientName}`, 20, 47);
      doc.text(`${formData.clientName}`, 120, 47);
      doc.text(`${formData.issuedOn}`, 20, 67);
      doc.text(`${formData.dueOn}`, 63, 67);
      doc.text(`${formData.billFrom}`, 106, 67);
      doc.text(`${formData.billTo}`, 152, 67);
      doc.text(`${formData.notes}`, 20, 177);
      let y = 105;
      let totalAmount = 0;

      doc.setTextColor("#5A5A5A");
      doc.setFontSize(15);
      formData.items.forEach((item) => {
        doc.text(`${item.item}`, 20, y);
        doc.text(`${item.price}`, 140, y, { align: "right" });
        doc.text(`${item.quantity} `, 160, y, { align: "right" });
        doc.text(`${item.totalPrice} ${formData.currency}`, 190, y, {
          align: "right",
        });
        y += 10;
        totalAmount += item.totalPrice;
      });

      doc.setTextColor("black");

      doc.setFontSize(17);
      doc.text(`Deposit Due`, 110, y + 20);

      doc.text(`${totalAmount}`, 190, y + 20, { align: "right" });

      doc.save("invoice.pdf");
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

export default PreviewPage;
