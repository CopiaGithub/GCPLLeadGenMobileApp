import { createSlice } from "@reduxjs/toolkit";
import { GetCampaignDataState } from "../../types/campaignTypes/GetCampaignsTypes";
import { GetCampaignDataRequest } from "../../services/campaignRequest/GetCampaignDataRequest";

const initialState: GetCampaignDataState = {
  getCampaignData: null,
  error: null,
  isFetched: false,
};

export const GetCampaignDataSlice = createSlice({
  name: "getCampaign",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetCampaignDataRequest.pending, (state) => {
        state.getCampaignData = null;
        state.error = null;
        state.isFetched = false;
      })
      .addCase(GetCampaignDataRequest.fulfilled, (state, action) => {
        state.getCampaignData = action.payload;
        state.error = null;
        state.isFetched = true;
      })
      .addCase(GetCampaignDataRequest.rejected, (state, action) => {
        state.getCampaignData = null;
        state.error = action.error.message;
        state.isFetched = false;
      });
  },
});

export default GetCampaignDataSlice.reducer;
