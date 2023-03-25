// InvoicingForm.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrenciesData from "../../currencies.json";
import InputField from "../components/InputField";
import InputFieldRO from "../components/InputFieldRO";
import TextArea from "../components/TextArea";
import { Heading, SmallHeading } from "../components/Typography";
import Button from "../components/Button";
import { Form, Formik, FieldArray } from "formik";
import { basicSchema } from "../schemas";
import SelectField from "../components/Select";

function InvoicingForm() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const navigate = useNavigate();
  const [currencies] = useState(CurrenciesData);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/preview", { state: { values } });
  };

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
      <Formik
        initialValues={{
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
        }}
        validationSchema={basicSchema}
      >
        {({ values, errors }) => (
          <Form>
            <div className="grid grid-cols-2 gap-[10px] bg-slate-100 pb-[1rem] pt-[.5rem] px-[.9rem] rounded-[10px] ">
              <InputField
                title="Recipient name"
                type="text"
                name="recipientName"
                className={"text-black"}
              />
              <InputField
                title="Recipient email"
                type="email"
                name="recipientEmail"
              />
            </div>

            <InputField title="Client name" type="text" name="clientName" />
            <InputField
              title="Project Description"
              type="text"
              name="projectDescription"
            />
            <div className="grid grid-cols-2 gap-[10px] rounded-[10px] ">
              <InputField title="Issued On" type="date" name="issuedOn" />
              <InputField title="Due On" type="date" name="dueOn" />
              <InputField title="Bill From" type="text" name="billFrom" />
              <InputField title="Bill To" type="text" name="billTo" />
            </div>

            <div className="flex gap-4 items-center">
              <SelectField title="Currency" name="currency" obj={currencies} />
            </div>

            <SmallHeading title="Invoice Items" className="invoice-items" />
            <FieldArray name="items">
              {({ push, remove }) => (
                <div>
                  {values.items.map((_, index) => (
                    <div
                      className="grid grid-cols-[51%_15%_10%_19%] gap-2"
                      key={index}
                    >
                      <InputField name={`items.${index}.item`} title="Item" />
                      <InputField name={`items.${index}.price`} title="Price" />
                      <InputField
                        name={`items.${index}.quantity`}
                        title="Qty"
                      />
                      <InputField
                        name={`items.${index}.totalPrice`}
                        title="Total"
                      />
                      <button
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
                  <Button
                    title="Add item"
                    className="bg-black"
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
                  />
                </div>
              )}
            </FieldArray>
            <pre>{JSON.stringify({ values, errors }, null, 4)} </pre>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default InvoicingForm;
