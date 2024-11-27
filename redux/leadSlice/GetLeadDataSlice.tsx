import { createSlice } from "@reduxjs/toolkit";
import { GetLeadDataState } from "../../types/leadTypes/GetLeadsTypes";
import { GetCampaignDataRequest } from "../../services/campaignRequest/GetCampaignDataRequest";
import { GetLeadDataRequest } from "../../services/leadsServices/GetLeadDataRequest";

const initialState: GetLeadDataState = {
  leadDetails: null,
  error: undefined,
  isLeadDetailsFetched: false,
};

export const GetLeadDataSlice = createSlice({
  name: "leadDataData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetLeadDataRequest.pending, (state) => {
        state.leadDetails = null;
        state.error = null;
        state.isLeadDetailsFetched = false;
      })
      .addCase(GetLeadDataRequest.fulfilled, (state, action) => {
        state.leadDetails = action.payload;
        state.error = null;
        state.isLeadDetailsFetched = true;
      })
      .addCase(GetLeadDataRequest.rejected, (state, action) => {
        state.leadDetails = null;
        state.error = action.error.message;
        state.isLeadDetailsFetched = false;
      });
  },
});

export default GetLeadDataSlice.reducer;
