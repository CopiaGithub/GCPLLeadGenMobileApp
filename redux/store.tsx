import { configureStore } from "@reduxjs/toolkit";
import { OrganizationSlice } from "./organizationSlice/OrganizationSlice";
import { GetCampaignDataSlice } from "./campaign/GetCampaignSlice";

export const store = configureStore({
  reducer: {
    orgnizationData: OrganizationSlice.reducer,
    getCampaignData: GetCampaignDataSlice.reducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
