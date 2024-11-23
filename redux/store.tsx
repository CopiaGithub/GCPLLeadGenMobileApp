import { configureStore } from "@reduxjs/toolkit";
import { OrganizationSlice } from "./organizationSlice/OrganizationSlice";
import { GetCampaignDataSlice } from "./campaign/GetCampaignSlice";
import { DistrictSlice } from "./districtSlice/DistrictSlice";
import { StateSlice } from "./stateSlice/StateSlice";
import { CampaignTypeSlice } from "./campaignTypeSlice/CampaignTypeSlice";

export const store = configureStore({
  reducer: {
    orgnizationData: OrganizationSlice.reducer,
    getCampaignData: GetCampaignDataSlice.reducer,
    districtData: DistrictSlice.reducer,
    stateData: StateSlice.reducer,
    campaignTypeData: CampaignTypeSlice.reducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
