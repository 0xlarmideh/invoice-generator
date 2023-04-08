// InvoicingForm.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrenciesData from "../../currencies.json";
import InputFieldFormik from "../components/InputFieldFormik";
import InputFieldRO from "../components/InputFieldRO";
import TextArea from "../components/TextArea";
import { Heading, SmallHeading } from "../components/Typography";
import Button from "../components/Button";
import { Form, Formik, FieldArray } from "formik";
import { basicSchema } from "../schemas";
import SelectField from "../components/Select";

function InvoicingForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [currencies] = useState(CurrenciesData);
  const [formData, setFormData] = useState(null);
  const [formValues, setFormValues] = useState(null)
  const [sessionData, setSessionData] = useState(null)
  let initFormik = {
    recipientName: "",
    recipientEmail: "",
    clientName: "",
    projectDescription: "",
    issuedOn: "",
    dueOn: "",
    billFrom: "",
    billTo: "",
    currency: "",
    items: [
      {
        item: "",
        price: "",
        quantity: "",
        totalPrice: "",
      },
    ],
    notes: "",
  };


  // const [savedData, setSavedData] = useState(null);
  let oldData 
  oldData = JSON.parse(localStorage.getItem("savedItems"));
  let sData = JSON.parse(sessionStorage.getItem("sessionData"));
  if (sData){
    initFormik = sData
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
    <div>
      <Heading
        title="Create New Invoice"
        className="border-b-2 border-slate-100 pb-[2rem] mb-[1.2rem] "
      />
      {/* Map over local storage items */}
      <div>
        {oldData && (
          <div className="flex gap-2 mb-4 ">
            {oldData.map((item, index) => {
              return (
                <button
                  key={index}
                  // Set savedData to current item
                  onClick={() => {
                    savedData = item

                    // Update formValues state
                    setFormValues(savedData)
                    console.log(savedData);
                  }}
                >
                  <div className="card border-2 p-4 rounded-[10px] ">
                    <h2 className="font-bold text-[20px] ">
                      {item.clientName}{" "}
                    </h2>
                    <p>{item.recipientName} </p>
                  </div>
                </button>
              );
            })}
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
        {({ values, errors, actions, isSubmitting }) => (
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              setFormData(values);
            }}
          >
            <div className="grid grid-cols-2 gap-[10px] bg-slate-100 pb-[1rem] pt-[.5rem] px-[.9rem] rounded-[10px] ">
              <InputFieldFormik
                title="Recipient name"
                type="text"
                name="recipientName"
                className={"text-black"}
              />
              {/* {errors.recipientName ? <div>{errors.recipientName} </div> : null} */}
              <InputFieldFormik
                title="Recipient email"
                type="email"
                name="recipientEmail"
              />
            </div>

            <InputFieldFormik
              title="Client name"
              type="text"
              name="clientName"
            />
            <InputFieldFormik
              title="Project Description"
              type="text"
              name="projectDescription"
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
                      <div className="grid grid-cols-[51%_15%_10%_19%] gap-2">
                        <InputFieldFormik
                          name={`items.${index}.item`}
                          title="Item"
                        />
                        <InputFieldFormik
                          name={`items.${index}.price`}
                          title="Price"
                        />
                        <InputFieldFormik
                          name={`items.${index}.quantity`}
                          title="Qty"
                        />
                        <InputFieldFormik
                          name={`items.${index}.totalPrice`}
                          title="Total"
                          value={item.price * item.quantity}
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
                    className="font-bold text-purple-800 my-[1.4rem]"
                    type="button"
                    onClick={(e) => {
                      push({
                        item: "",
                        price: "",
                        quantity: "",
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
            <Button type="submit" title="Preview" onClick={() => sessionStorage.setItem("sessionData", JSON.stringify(values) )} className="bg-purple-800" />
            {/* <pre>{JSON.stringify({ values, errors }, null, 4)} </pre> */}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default InvoicingForm;
