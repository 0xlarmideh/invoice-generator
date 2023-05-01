import * as yup from 'yup';

export const basicSchema = yup.object().shape({
  invoiceNumber: yup.number().min(1).required("Minimum is 1"),
  recipientEmail: yup
    .string()
    .email("Please enter a valid email")
    .required("Required"),
  recipientName: yup.string().required("Required"),
  clientName: yup.string().required("Required"),
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
