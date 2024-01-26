import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  SmallHeading,
  Paragraph,
} from "../../components/typography/Typography.jsx";
import { Button } from "../../components/form/index.jsx";
import jsPDFInvoiceTemplate from "../../components/jsPdf/jsPDFTemplate.js";
import { OutputType } from "../../components/jsPdf/outputType.js";
import { useSelector } from "react-redux";
import { useFetch } from "../../utils/hooks/useFetch.js";
import SelectInvoiceDesignType from "./SelectInvoiceType.jsx";
import DefaultDesign from "./templates/DefaultDesign.jsx";
import MinimalistDesign from "./templates/MinimalistDesign.jsx";
import SimpleDesign from "./templates/SimpleDesign.jsx";
import useJsPDFProps from "../../components/jsPdf/useJsPDFProps.js";

function Preview() {
  const navigate = useNavigate();
  const { formData } = useSelector((state) => state.formdata);
  const { CustomFetchPOSTRequest } = useFetch();
  const [loading, setLoading] = useState(false);

  let number = 0;
  let totalAmount = 0;
  formData?.items.forEach((item) => {
    number += 1;
    totalAmount += item.totalPrice;
  });

  const InvoiceDesignArray = [
    {
      value: "DEFAULT",
      name: "Default",
      component: <DefaultDesign formData={formData} totalAmount={totalAmount} />,
    },
    {
      value: "MINIMALIST",
      name: "Minimalist",
      component: <MinimalistDesign formData={formData} totalAmount={totalAmount} />,
    },
    {
      value: "SIMPLE",
      name: "Simple",
      component: <SimpleDesign formData={formData} totalAmount={totalAmount} />,
    },
  ];
  const [invoiceDesign, selectInvoiceDesign] = useState(InvoiceDesignArray[0]);

  const { pdfProps } = useJsPDFProps({ formData, totalAmount, number })

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    console.log(import.meta.env.VITE_API_URL)
  }, []);

  if (!formData) {
    navigate("/");
    return null;
  }

  const handleEditClick = () => {
    // window.history.back()
    navigate("/invoice");
  };



  const handleDownloadClick = async () => {
    // Enable once Backend is fully done
    if (invoiceDesign.value !== "DEFAULT") {
      await CustomFetchPOSTRequest(`${import.meta.env.VITE_API_URL}/invoice`, {
        ...formData,
        invoiceStyle: invoiceDesign.value,
        totalAmount,
      });
    }
    else {
      jsPDFInvoiceTemplate(pdfProps);
      // Navigate to download screen
      navigate("/downloaded");
      setTimeout(() => {

      }, 600);
    }

  };

  return loading ? (
    <div className="loading-spinner">
      <span className="loader"></span>
    </div>
  ) : (
    <div className="max-w-[900px] mx-auto pb-[4rem] p-[20px] text-text shadow">
      <div className="mb-10">
        <SelectInvoiceDesignType
          InvoiceDesignTypes={InvoiceDesignArray}
          invoiceDesignType={invoiceDesign.value}
          onInvoiceDesignClicked={(value) => selectInvoiceDesign(value)}
        />
      </div>
      <div>
        {invoiceDesign.component}
      </div>

      <div className="my-[5rem]"></div>
      <div className="flex justify-between">
        <Button onClick={handleEditClick} title="Edit" className="text-text" />
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
