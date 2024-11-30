import { createSlice } from "@reduxjs/toolkit";
import { DistrictState } from "../../types/districtTypes/DistrictTypes";
import { DistrictRequest } from "../../services/districtRequest/DistrictRequest";
import { CompanyTypeState } from "../../types/companyTypeTypes/CompanyTypeTypes";
import { CompanyTypeRequest } from "../../services/companyTypeRequest/CompanyTypeRequest";

const initialState: CompanyTypeState = {
  CompanyType: null,
  error: undefined,
  isCompanyTypesFetched: false,
};

export const CompanyTypeSlice = createSlice({
  name: "companyTypeData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CompanyTypeRequest.pending, (state) => {
        state.CompanyType = null;
        state.error = null;
        state.isCompanyTypesFetched = false;
      })
      .addCase(CompanyTypeRequest.fulfilled, (state, action) => {
        state.CompanyType = action.payload;
        state.error = null;
        state.isCompanyTypesFetched = true;
      })
      .addCase(CompanyTypeRequest.rejected, (state, action) => {
        state.CompanyType = null;
        state.error = action.error.message;
        state.isCompanyTypesFetched = false;
      });
  },
});

export default CompanyTypeSlice.reducer;
