import * as yup from "yup";

export const basicSchema = yup.object().shape({
  invoiceNumber: yup.string().required("Please input a value"),
  recipientEmail: yup
    .string()
    .email("Please enter a valid email")
    .required("Recipient email is required"),
  recipientName: yup.string().required("Recipient name is required"),
  clientName: yup.string().required("Client name is required"),
  billFrom: yup.string().required("Bill from is required"),
  billTo: yup.string().required("Bill to is required"),
  currency: yup.string().required("Please select currency"),
  clientEmail: yup
    .string()
    .email("Please enter a valid email")
    .required("Client email is required"),
  issuedOn: yup
    .date()
    .max(new Date(), {
      message: "Issued Date can't be higher than today's date",
    })
    .required(),
  items: yup
    .array()
    .of(
      yup.object().shape({
        item: yup.string().required("Please add item name"),
        quantity: yup
          .number()
          .min(1, "Qty must not be less than 1")
          .required("Please input at least 1 quantity"),
        price: yup
          .number()
          .min(1, "Price must not be less than 1")
          .required("Minimum is 1"),
      })
    )
    .min(1, "Please add at least one item")
    .required("Item is required, please add at least one."),
});
