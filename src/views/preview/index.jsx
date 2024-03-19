import React, { useState, useEffect, useRef } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";

function Preview() {
  const navigate = useNavigate();
  const formData = useSelector((state) => state.formdata.formData);
  const { CustomFetchPOSTRequest } = useFetch();
  const [loading, setLoading] = useState(false);
  const contentToPrint = useRef(null);

  let number = 0;
  let totalAmount = 0;
  formData?.items?.forEach((item) => {
    number += 1;
    totalAmount += item.totalPrice;
  });

  const InvoiceDesignArray = [
    {
      value: "DEFAULT",
      name: "Default",
      component: (
        <div ref={contentToPrint}>
          <DefaultDesign formData={formData} totalAmount={totalAmount} />
        </div>
      ),
    },
    {
      value: "MINIMALIST",
      name: "Minimalist",
      component: (
        <div ref={contentToPrint}>
          <MinimalistDesign formData={formData} totalAmount={totalAmount} />
        </div>
      ),
    },
    {
      value: "SIMPLE",
      name: "Simple",
      component: (
        <div ref={contentToPrint}>
          <SimpleDesign formData={formData} totalAmount={totalAmount} />
        </div>
      ),
    },
  ];
  const [invoiceDesign, selectInvoiceDesign] = useState(InvoiceDesignArray[0]);

  const { pdfProps } = useJsPDFProps({ formData, totalAmount, number });

  useEffect(() => {
    if (!formData) {
      navigate("/");
    }
  }, []);

  const handleEditClick = () => {
    // window.history.back()
    navigate("/invoice");
  };

  const handlePrintPDF = useReactToPrint({
    documentTitle: "Invoice document",
    onBeforePrint: () => setLoading(true),
    onAfterPrint: () => {
      setLoading(false);
      toast.success("Invoice downloaded", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 15000,
      });
    },
    removeAfterPrint: true,
    bodyClass: "px-6",
  });

  const handleDownloadClick = async () => {
    if (invoiceDesign.value !== "DEFAULT") {
      await handlePrintPDF(null, () => contentToPrint.current);
      navigate("/downloaded");
    } else {
      jsPDFInvoiceTemplate(pdfProps);
      navigate("/downloaded");
    }
  };

  return loading ? (
    <div className="loading-spinner">
      <span className="loader"></span>
    </div>
  ) : (
    <div className="max-w-[900px] mx-auto pb-[4rem] p-[20px] text-text shadow">
      <ToastContainer />
      <div className="mb-10">
        <SelectInvoiceDesignType
          InvoiceDesignTypes={InvoiceDesignArray}
          invoiceDesignType={invoiceDesign.value}
          onInvoiceDesignClicked={(value) => selectInvoiceDesign(value)}
        />
      </div>
      <div>{invoiceDesign.component}</div>

      <div className="my-[5rem]"></div>
      <div className="flex justify-between">
        <Button onClick={handleEditClick} title="Edit" className="text-text" />
        <Button
          onClick={handleDownloadClick}
          title={loading ? "Downloading" : "Download PDF"}
          className={
            loading ? "bg-grey-700 text-slate-200" : "bg-blue text-white"
          }
        />
      </div>
    </div>
  );
}

export default Preview;
