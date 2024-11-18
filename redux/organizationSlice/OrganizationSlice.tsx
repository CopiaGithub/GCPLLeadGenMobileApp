import { createSlice } from "@reduxjs/toolkit";

import { OrganizationRequest } from "../../services/organizationRequest/OrganizationRequest";
import { OrganizationDataState } from "../../types/organizationTypes/OrganizationTypes";

const initialState: OrganizationDataState = {
  orgData: null,
  error: undefined,
  isOrgDataFetched: false,
};

export const OrganizationSlice = createSlice({
  name: "getOrgData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(OrganizationRequest.pending, (state) => {
        state.orgData = null;
        state.error = null;
        state.isOrgDataFetched = false;
      })
      .addCase(OrganizationRequest.fulfilled, (state, action) => {
        state.orgData = action.payload;
        state.error = null;
        state.isOrgDataFetched = true;
      })
      .addCase(OrganizationRequest.rejected, (state, action) => {
        state.orgData = null;
        state.error = action.error.message;
        state.isOrgDataFetched = false;
      });
  },
});

export default OrganizationSlice.reducer;
