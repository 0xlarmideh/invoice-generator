import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: null,
};

export const formDataSlice = createSlice({
  name: "formdata",
  initialState,
  reducers: {
    setFormDataValues: (state, action) => {
      state.formData = action.payload;
    },
    resetFormData: (state) => {
      state.formData = null;
    },
  },
});

export const { setFormDataValues, resetFormData } =
  formDataSlice.actions;

export default formDataSlice.reducer;
