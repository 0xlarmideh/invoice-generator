// InvoicingForm.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import currencies from "../../../currencies.json";
import {
  Heading,
  SmallHeading,
  Paragraph,
} from "../../components/typography/Typography";``
import { Button, InputFieldFormik, SelectField } from "../../components/form";
import { Form, Formik, FieldArray } from "formik";
import { basicSchema } from "../../schemas";
import { useDispatch, useSelector } from "react-redux";
import { setDrafts } from "../../store/slices/draftSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setFormDataValues } from "../../store/slices/formDataSlice";
import Drafts from "./Drafts";

function InvoicingForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(null);
  const [isOpen, setOpen] = useState(false);
  let initFormik = {
    invoiceNumber: "",
    recipientName: "",
    recipientEmail: "",
    clientName: "",
    clientEmail: "",
    projectDescription: "",
    issuedOn: "",
    dueOn: "",
    billFrom: "",
    billTo: "",
    currency: "",
    items: [
      {
        item: "",
        desc: "",
        price: 1,
        quantity: 1,
        totalPrice: "",
      },
    ],
    notes: "",
  };
  const { drafts } = useSelector((state) => state.drafts);
  const { formData } = useSelector((state) => state.formdata);

  if (formData) {
    initFormik = formData;
  }

  const toastConfig = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
  };

  const handleSave = (prop) => {
    // Find if draft is already in draft array
    const isInArray = drafts.some(
      (draft) => prop.invoiceNumber === draft.invoiceNumber
    );
    if (isInArray) {
      toast.error(
        "This invoice has already been added to the draft",
        toastConfig
      );
    } else {
      const formVal = { ...prop };
      formVal.items = prop.items.map((item) => {
        return {
          item: item.item,
          desc: item.desc,
          price: item.price,
          quantity: item.quantity,
          totalPrice: parseFloat(item.price * item.quantity),
        };
      });
      let draftArr = [...drafts, formVal];
      dispatch(setDrafts(draftArr));
      toast.success("Invoice successfully added to draft", toastConfig);
    }
  };

  const handleDeleteDraft = (prop) => {
    let draftArr = drafts.filter(
      (draft) => draft.invoiceNumber !== prop.invoiceNumber
    );
    dispatch(setDrafts(draftArr));
    toast.success("Invoice successfully removed from draft", toastConfig);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Initialize savedData variable to store clicked preset

  // Show loading screen
  return loading ? (
    <div className="loading-spinner">
      <span className="loader"></span>
    </div>
  ) : (
    <div className="max-w-[900px] mx-auto my-[0] p-[20px] shadow ">
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
          const formVal = { ...values };
          formVal.items = values.items.map((item) => {
            return {
              item: item.item,
              desc: item.desc,
              price: item.price,
              quantity: item.quantity,
              totalPrice: parseFloat(item.price * item.quantity),
            };
          });
          dispatch(setFormDataValues(formVal));
          navigate("/preview");
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
              <InputFieldFormik
                type="text"
                name="invoiceNumber"
                className={"text-black"}
              />
            </div>
            <InputFieldFormik
              title="Recipient name"
              type="text"
              name="recipientName"
              className={"text-black"}
            />
            <InputFieldFormik
              title="Recipient email"
              type="email"
              name="recipientEmail"
            />

            <InputFieldFormik
              title="Client name"
              type="text"
              name="clientName"
            />
            <InputFieldFormik
              title="Client email"
              type="email"
              name="clientEmail"
            />

            <div className="grid grid-cols-2 gap-[10px] rounded-[10px] ">
              <InputFieldFormik title="Issued On" type="date" name="issuedOn" />
              <InputFieldFormik title="Due On" type="date" name="dueOn" />
              <InputFieldFormik title="Bill From" type="text" name="billFrom" />
              <InputFieldFormik title="Bill To" type="text" name="billTo" />
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
                        <InputFieldFormik
                          name={`items.${index}.item`}
                          title="Item"
                        />
                        <InputFieldFormik
                          name={`items.${index}.desc`}
                          title="Desc"
                          type="text"
                        />
                        <InputFieldFormik
                          name={`items.${index}.price`}
                          title="Price"
                          type="number"
                        />
                        <InputFieldFormik
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
              <InputFieldFormik title="Notes" name="notes" />
            </div>
            <div className="btns flex justify-between my-[4rem] ">
              <Button
                type="button"
                title="Save Draft"
                onClick={() => {
                  handleSave(values);
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