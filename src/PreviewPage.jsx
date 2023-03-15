import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import jsPDF from "jspdf";

function PreviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;

  // const totalPrice = formData.items.reduce(
  //   (accumulator, currentItem) =>
  //     accumulator + currentItem.price * currentItem.quantity,
  //   0
  // );
  const totalPrice = eval(formData.items.price * formData.items.quantity);

  if (!formData) {
    navigate("/");
    return null;
  }

  const handleEditClick = () => {
    navigate("/", {state: {formData} });
  };

  const handleDownloadClick = () => {
    const doc = new jsPDF();
    // add title
    doc.setFontSize(22);
    doc.text("Invoice", 105, 20, { align: "center" });

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
  };

  return (
    <div>
      <h1>Preview</h1>
      <p>Recipient Email: {formData.recipientEmail}</p>
      <p>Project Description: {formData.projectDescription}</p>
      <p>Issued On: {formData.issuedOn}</p>
      <p>Due On: {formData.dueOn}</p>
      <p>Bill From: {formData.billFrom}</p>
      <p>Bill To: {formData.billTo}</p>
      <p>Items:</p>
      <ul>
        {formData.items.map((item, index) => (
          <li key={index}>
            {item.item}: {item.quantity} x {item.price} = {item.totalPrice}
            {formData.currency}
          </li>
        ))}
      </ul>
      <p>Notes: {formData.notes}</p>
      <button type="button" onClick={handleEditClick}>
        Edit
      </button>
      <button type="button" onClick={handleDownloadClick}>
        Download PDF
      </button>
    </div>
  );
}

export default PreviewPage;
