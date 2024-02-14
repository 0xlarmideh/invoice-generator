import { OutputType } from './outputType';

const useJsPDFProps = ({formData, totalAmount, number}) => {
  const pdfProps = {
    outputType: OutputType.Save,
    returnJsPDFDocObject: true,
    fileName: "Invoice",
    orientationLandscape: false,
    compress: true,
    stamp: {
      inAllPages: true, //by default = false, just in the last page
      src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
      type: "JPG", //optional, when src= data:uri (nodejs case)
      width: 20, //aspect ratio = width/height
      height: 20,
      margin: {
        top: 0, //negative or positive num, from the current position
        left: 0, //negative or positive num, from the current position
      },
    },

    business: {
      label: "Invoice issued from:",
      name: `${formData?.recipientName}`,
      address: `${formData?.billFrom}`,
      email: `${formData?.recipientEmail}`,
    },

    contact: {
      label: "Invoice issued for:",
      name: `${formData?.clientName}`,
      address: `${formData?.billTo}`,
      email: `${formData?.clientEmail}`,
    },

    invoice: {
      label: `Invoice #: `,
      num: `${formData?.invoiceNumber}`,
      invDate: `${formData?.issuedOn}`,
      invGenDate: `${formData?.dueDate}`,
      headerBorder: false,
      tableBodyBorder: false,
      header: [
        {
          title: "#",
          style: {
            width: 10,
          },
        },
        {
          title: "Title",
          style: {
            width: 30,
          },
        },
        {
          title: "Description",
          style: {
            width: 80,
          },
        },
        { title: "Price" },
        { title: "Quantity" },
        // { title: "Unit" },
        { title: "Total" },
      ],
      table: Array.from(Array(number), (item, index) => [
        index + 1,
        `${formData?.items[index].item}`,
        `${formData?.items[index].desc}`,
        `${formData?.items[index].price} `,
        `${formData?.items[index].quantity}`,
        `${formData?.items[index].totalPrice} ${formData?.currency}`,
      ]),
      additionalRows: [
        {
          col1: "Total:",
          col2: `${totalAmount} ${formData?.currency}`,
          col3: "ALL",
          style: {
            fontSize: 14, //optional, default 12
          },
        },
      ],
      invDescLabel: "Invoice Note",
      invDesc: `${formData?.notes}`,
    },
    footer: {
      text: "The invoice is created on a computer and is valid without the signature and stamp.",
    },
    pageEnable: true,
    pageLabel: "Page ",
  };
  return { pdfProps }
}

export default useJsPDFProps