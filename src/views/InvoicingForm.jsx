// InvoicingForm.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrenciesData from "../../currencies.json";
import InputFieldFormik from "../components/form/InputFieldFormik";
import InputFieldRO from "../components/form/InputFieldRO";
import { Heading, SmallHeading, Paragraph } from "../components/Typography";
import { Icon } from "@iconify/react";
import Button from "../components/form/Button";
import { Form, Formik, FieldArray } from "formik";
import { basicSchema } from "../schemas";
import SelectField from "../components/form/Select";

function InvoicingForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [currencies] = useState(CurrenciesData);
  const [formData, setFormData] = useState(null);
  const [formValues, setFormValues] = useState(null);
  const [isOpen, setOpen] = useState(false)
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
        price: "",
        quantity: 1,
        totalPrice: "",
      },
    ],
    notes: "",
  };

  let oldData;
  oldData = JSON.parse(localStorage.getItem("savedItems"));
  let sData = JSON.parse(sessionStorage.getItem("sessionData"));
  if (sData) {
    initFormik = sData;
  }

  const handleSave = (prop) => {
    // Create two new variables and use it to save data to storage after click
    let old_data = [];
    // let newData = JSON.parse(localStorage.getItem("savedItems"));
    if (oldData == undefined) {
      oldData = null;
    }
    if (oldData) {
      old_data = oldData;
    }
    // Push the current value gotten from location state to the old data
    old_data.push(prop);
    // Update localStorage state
    localStorage.setItem("savedItems", JSON.stringify(old_data));
  }

  useEffect(() => {
    // console.log(oldData);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    if (formData) {
      console.log(formData);
      navigate("/preview", { state: { formData } });
    }
  }, [formData]);

  // Initialize savedData variable to store clicked preset
  let savedData;

  // Show loading screen
  return loading ? (
    <div className="loading-spinner">
      <span className="loader"></span>
    </div>
  ) : (
    <div className="max-w-[900px] mx-auto my-[0] p-[20px] shadow ">
      <Heading
        title="Invoice Generator App"
        className=" text-center text-blue pb-[.4rem] "
      />
      <Paragraph
        title="Create invoice seamlessly within a lightning speed of time"
        className="text-text text-center pb-[2rem] "
      />
      {/* Map over local storage items */}
      <div>
        {oldData && (
          <div className="flex gap-2 mb-4 text-text ">
            <div>
              <div className="flex justify-between border-b-[1px] items-center pb-4 mb-4 ">
                <Paragraph title="Drafts" />
                <div onClick={() => setOpen(!isOpen)}>
                  {isOpen ? (
                    <Icon
                      icon="material-symbols:keyboard-arrow-up"
                      width="24"
                    />
                  ) : (
                    <Icon
                      icon="material-symbols:keyboard-arrow-down"
                      width="24"
                    />
                  )}
                </div>
              </div>
              {isOpen && (
                <div>
                  {oldData.map((item, index) => {
                    return (
                      <button
                        key={index}
                        // Set savedData to current item
                        onClick={() => {
                          savedData = item;

                          // Update formValues state
                          setFormValues(savedData);
                          console.log(savedData);
                        }}
                      >
                        <div className=" ">
                          <p className="font-regular text-[16px] ">Invoice Number: 
                            {item.invoiceNumber}
                          </p>
                          <p>{item.recipientName} </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Formik
        // Use formValues or default state values for form
        initialValues={formValues || initFormik}
        validationSchema={basicSchema}
        enableReinitialize
      >
        {/* Deconstruct props from Formik  */}
        {({ values, errors, actions, setFieldValue }) => (
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              setFormData(values);
              console.log(errors);
            }}
          >
            <div className="flex flex-col text-text text-[21px]">
              <label>
                Invoice Number:{" "}
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
                        <InputFieldRO
                          name={`items.${index}.totalPrice`}
                          value={
                            (item.totalPrice = parseFloat(
                              item.price * item.quantity
                            ))
                          }
                          title="Total"
                        />
                      </div>
                      <button
                        className="font-bold text-red-800"
                        type="button"
                        onClick={() => {
                          console.log("Clicked");
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
                onClick={() => handleSave(values)}
                className="text-text"
              />
              <Button
                type="submit"
                title="Preview"
                onClick={() => {
                  sessionStorage.setItem("sessionData", JSON.stringify(values));
                  console.log({ errors });
                }}
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
