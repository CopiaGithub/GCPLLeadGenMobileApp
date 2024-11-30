import { createSlice } from "@reduxjs/toolkit";
import { IndustryTypeState } from "../../types/industryTypeTypes/IndustryTypeTypes";
import { IndustryTypeRequest } from "../../services/industryTypeRequest/IndustryTypeRequest";

const initialState: IndustryTypeState = {
  IndustryType: null,
  error: undefined,
  isIndustryTypesFetched: false,
};

export const IndustryTypeSlice = createSlice({
  name: "industryTypeData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(IndustryTypeRequest.pending, (state) => {
        state.IndustryType = null;
        state.error = null;
        state.isIndustryTypesFetched = false;
      })
      .addCase(IndustryTypeRequest.fulfilled, (state, action) => {
        state.IndustryType = action.payload;
        state.error = null;
        state.isIndustryTypesFetched = true;
      })
      .addCase(IndustryTypeRequest.rejected, (state, action) => {
        state.IndustryType = null;
        state.error = action.error.message;
        state.isIndustryTypesFetched = false;
      });
  },
});

export default IndustryTypeSlice.reducer;
