import * as yup from 'yup';

export const basicSchema = yup.object().shape({
  invoiceNumber: yup.string().required("Please input a value"),
  recipientEmail: yup
    .string()
    .email("Please enter a valid email")
    .required("Recipient email is required"),
  recipientName: yup.string().required("Recipient name is required"),
  clientName: yup.string().required("Client name is required"),
  clientEmail: yup
    .string()
    .email("Please enter a valid email")
    .required("Client email is required"),
  issuedOn: yup
    .date()
    .max(new Date(), { message: "Issued Date can't be higher than today's date" })
    .required(),
  items: yup.object().shape({
    item: yup.string().required(),
    quantity: yup.number().min(1).required("Please input at least 1 quantity"),
    price: yup.number().min(1).required("Minimum is 1"),
  }),
});
