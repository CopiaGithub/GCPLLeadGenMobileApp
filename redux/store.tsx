import { configureStore } from "@reduxjs/toolkit";
import { OrganizationSlice } from "./organizationSlice/OrganizationSlice";
import { GetCampaignDataSlice } from "./campaign/GetCampaignSlice";
import { DistrictSlice } from "./districtSlice/DistrictSlice";
import { StateSlice } from "./stateSlice/StateSlice";
import { CampaignTypeSlice } from "./campaignTypeSlice/CampaignTypeSlice";
import { CompanyTypeSlice } from "./companyTypeSlice/CompanyTypeSlice";
import { IndustryTypeSlice } from "./industryTypeSlice/IndustryTypeSlice";
import { ProductFamilySlice } from "./productFamilyModelSlice/ProductFamiliySlice";
import { ProductModelSlice } from "./productFamilyModelSlice/ProductModelSlice";

export const store = configureStore({
  reducer: {
    orgnizationData: OrganizationSlice.reducer,
    getCampaignData: GetCampaignDataSlice.reducer,
    districtData: DistrictSlice.reducer,
    stateData: StateSlice.reducer,
    campaignTypeData: CampaignTypeSlice.reducer,
    companyTypeData: CompanyTypeSlice.reducer,
    industryTypeData: IndustryTypeSlice.reducer,
    productFamily: ProductFamilySlice.reducer,
    productModel: ProductModelSlice.reducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
