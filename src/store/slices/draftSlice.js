import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drafts: [],
};

export const draftsSlice = createSlice({
  name: "drafts",
  initialState,
  reducers: {
    setDrafts: (state, action) => {
      state.drafts = action.payload;
    },
  },
});

export const { setDrafts } =
  draftsSlice.actions;

export default draftsSlice.reducer;
