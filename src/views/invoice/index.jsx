// InvoicingForm.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import currencies from "../../../currencies.json";
import {
  Heading,
  SmallHeading,
  Paragraph,
} from "../../components/typography/Typography";
``;
import { Button, CustomInput, SelectField } from "../../components/form";
import { Form, Formik, FieldArray } from "formik";
import { basicSchema } from "../../schemas";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Drafts from "./Drafts";
import useInvoice from "../../utils/hooks/useInvoice";

function InvoicingForm() {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState(null);
  const { drafts } = useSelector((state) => state.drafts);
  const { formData } = useSelector((state) => state.formdata);
  const [isOpen, setOpen] = useState(false);
  const { handleDeleteDraft, handlePreview, handleSaveDraft, initFormik } = useInvoice({
    drafts, formData
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Show loading screen
  return loading ? (
    <div className="loading-spinner">
      <span className="loader"></span>
    </div>
  ) : (
    <div className="max-w-[900px] mx-auto mt-[0] mb-8 p-[20px] pb-[10px] shadow ">
      <ToastContainer />
      <Heading
        title="Invoice Generator App"
        className=" text-center font-monument text-blue pb-[.4rem] "
      />
      <Paragraph
        title="Create invoice seamlessly within a lightning speed of time"
        className="text-text text-center pb-[2rem] "
      />
      {/* Map over local storage items */}
      <Drafts
        isOpen={isOpen}
        onOpen={() => setOpen(!isOpen)}
        onDelete={(item) => handleDeleteDraft(item)}
        onSelectvalue={(item) => {
          setFormValues(item);
        }}
      />
      <Formik
        // Use formValues or default state values for form
        initialValues={formValues || initFormik}
        validationSchema={basicSchema}
        validateOnMount
        enableReinitialize
        onSubmit={(values) => {
          handlePreview(values);
        }}
      >
        {/* Deconstruct props from Formik  */}
        {({ values, isValid }) => (
          <Form>
            <div className="flex flex-col text-text text-[21px]">
              <label>
                Invoice Number:
                <span className="font-medium text-blue">
                  {values.invoiceNumber}
                </span>
              </label>
              <CustomInput
                type="text"
                name="invoiceNumber"
                className={"text-black"}
              />
            </div>
            <CustomInput
              title="Recipient name"
              type="text"
              name="recipientName"
              className={"text-black"}
            />
            <CustomInput
              title="Recipient email"
              type="email"
              name="recipientEmail"
            />

            <CustomInput title="Client name" type="text" name="clientName" />
            <CustomInput title="Client email" type="email" name="clientEmail" />

            <div className="grid grid-cols-2 gap-[10px] rounded-[10px] ">
              <CustomInput title="Issued On" type="date" name="issuedOn" />
              <CustomInput title="Due On" type="date" name="dueOn" />
              <CustomInput title="Bill From" type="text" name="billFrom" />
              <CustomInput title="Bill To" type="text" name="billTo" />
            </div>

            <div className="flex gap-4 items-center">
              <SelectField title="Currency" name="currency" obj={currencies} />
            </div>

            <SmallHeading title="Invoice Items" className="invoice-items" />
            <FieldArray name="items">
              {({ push, remove }) => (
                <div>
                  {values.items.map((item, index) => (
                    <div key={index}>
                      <div className="grid grid-cols-[25%_39%_10%_7%_13%] gap-2 items-baseline">
                        <CustomInput
                          name={`items.${index}.item`}
                          title="Item"
                        />
                        <CustomInput
                          name={`items.${index}.desc`}
                          title="Desc"
                          type="text"
                        />
                        <CustomInput
                          name={`items.${index}.price`}
                          title="Price"
                          type="number"
                        />
                        <CustomInput
                          name={`items.${index}.quantity`}
                          title="Qty"
                          type="number"
                        />
                        <div className="flex flex-col">
                          <p className="text-[20px] font-regular py-[.1rem] text-text">
                            Total
                          </p>
                          <p className="font-regular font-grotesk text-[16px] text-text p-[12px] border-[2px] border-slate-200 focus:outline-none focus:border-cyan-300 rounded-[10px] ">
                            {parseFloat(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                      <button
                        className="font-bold text-red-800"
                        type="button"
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <button
                    className="font-bold text-blue mt-[1.4rem]"
                    type="button"
                    onClick={(e) => {
                      push({
                        item: "",
                        desc: "",
                        price: "",
                        quantity: 1,
                        totalPrice: "",
                      });
                      e.preventDefault();
                    }}
                  >
                    + Add item
                  </button>
                </div>
              )}
            </FieldArray>
            <div className="mb-[1.4rem]">
              <CustomInput title="Notes" name="notes" />
            </div>
            <div className="btns flex justify-between my-[4rem] ">
              <Button
                type="button"
                title="Save Draft"
                onClick={() => {
                  handleSaveDraft(values);
                }}
                className="text-text"
                disabled={!isValid}
              />
              <Button
                type="submit"
                title="Preview"
                className="bg-blue text-white"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default InvoicingForm;
