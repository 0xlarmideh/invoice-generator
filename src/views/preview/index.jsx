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
import { ToastContainer, toast } from "react-toastify";

function Preview() {
  const navigate = useNavigate();
  const  formData  = useSelector((state) => state.formdata.formData) ;
  const { CustomFetchPOSTRequest } = useFetch();
  const [loading, setLoading] = useState(false);

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
    if (!formData) {
      navigate("/");
    }
  }, []);

  const handleEditClick = () => {
    // window.history.back()
    navigate("/invoice");
  };



  const handleDownloadClick = async () => {
    // Enable once Backend is fully done
    if (invoiceDesign.value !== "DEFAULT") {
      setLoading(true);
      await CustomFetchPOSTRequest("http://localhost:5000/api/invoice", {
        ...formData,
        invoiceStyle: invoiceDesign.value,
        totalAmount,
      }).then(() => {
        try {
          setLoading(false);
          navigate("/downloaded");
        } catch (error) {
          toast.error(
            "An error occurred while creating invoice",
            {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
            }
          );
        }
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
        <ToastContainer />
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
          title={loading ? "Downloading" : "Download PDF"}
          className={loading ? "bg-grey-700 text-slate-200" : "bg-blue text-white"}
        />
      </div>
    </div>
  );
}

export default Preview;
