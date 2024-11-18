import { configureStore } from "@reduxjs/toolkit";
import { OrganizationSlice } from "./organizationSlice/OrganizationSlice";

export const store = configureStore({
  reducer: {
    orgnizationData: OrganizationSlice.reducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
