import { createSlice } from "@reduxjs/toolkit";
import { DistrictState } from "../../types/districtTypes/DistrictTypes";
import { DistrictRequest } from "../../services/districtRequest/DistrictRequest";
import { CompanyTypeState } from "../../types/companyTypeTypes/CompanyTypeTypes";
import { CompanyTypeRequest } from "../../services/companyTypeRequest/CompanyTypeRequest";
import { ProductTotalsState } from "../../types/dashboardTypes/ProductTotalsTypes";
import { ProductTotalRequest } from "../../services/dashboardRequest/ProductTotalRequest";

const initialState: ProductTotalsState = {
  productTotals: null,
  error: undefined,
  isProductTotalssFetched: false,
};

export const ProductTotalSlice = createSlice({
  name: "productTotalData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ProductTotalRequest.pending, (state) => {
        state.productTotals = null;
        state.error = null;
        state.isProductTotalssFetched = false;
      })
      .addCase(ProductTotalRequest.fulfilled, (state, action) => {
        state.productTotals = action.payload;
        state.error = null;
        state.isProductTotalssFetched = true;
      })
      .addCase(ProductTotalRequest.rejected, (state, action) => {
        state.productTotals = null;
        state.error = action.error.message;
        state.isProductTotalssFetched = false;
      });
  },
});

export default ProductTotalSlice.reducer;
