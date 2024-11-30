import { createSlice } from "@reduxjs/toolkit";
import { DistrictState } from "../../types/districtTypes/DistrictTypes";
import { DistrictRequest } from "../../services/districtRequest/DistrictRequest";
import { CapmpaignTypeState } from "../../types/campaignTypeTypes/CampaignTypeTypes";
import { CampaignTypeRequest } from "../../services/campaignTypeRequest/CampaignTypeRequest";

const initialState: CapmpaignTypeState = {
  capmpaignTypes: null,
  error: undefined,
  isCapmpaignTypesFetched: false,
};

export const CampaignTypeSlice = createSlice({
  name: "campaignTypeData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CampaignTypeRequest.pending, (state) => {
        state.capmpaignTypes = null;
        state.error = null;
        state.isCapmpaignTypesFetched = false;
      })
      .addCase(CampaignTypeRequest.fulfilled, (state, action) => {
        state.capmpaignTypes = action.payload;
        state.error = null;
        state.isCapmpaignTypesFetched = true;
      })
      .addCase(CampaignTypeRequest.rejected, (state, action) => {
        state.capmpaignTypes = null;
        state.error = action.error.message;
        state.isCapmpaignTypesFetched = false;
      });
  },
});

export default CampaignTypeSlice.reducer;
