import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setDrafts } from '../../store/slices/draftSlice';
import { setFormDataValues } from '../../store/slices/formDataSlice';
import { useNavigate } from 'react-router-dom';

const useInvoice = ({drafts}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toastConfig = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
  };

  const handleSaveDraft = (prop) => {
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

  const handlePreview = (values) => {
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
  }
  return {handleDeleteDraft, handleSaveDraft, handlePreview}
}

export default useInvoice