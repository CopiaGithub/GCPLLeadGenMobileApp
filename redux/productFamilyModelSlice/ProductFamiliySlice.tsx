import { createSlice } from "@reduxjs/toolkit";
import { ProductFamilyState } from "../../types/productFamilyModelTypes/ProductFamilyTypes";
import { ProductFamilyRequest } from "../../services/productFamilyModelRequest/ProductFamilyRequest";

const initialState: ProductFamilyState = {
  ProductFamily: null,
  error: undefined,
  isProductFamilysFetched: false,
};

export const ProductFamilySlice = createSlice({
  name: "productFamilyData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ProductFamilyRequest.pending, (state) => {
        state.ProductFamily = null;
        state.error = null;
        state.isProductFamilysFetched = false;
      })
      .addCase(ProductFamilyRequest.fulfilled, (state, action) => {
        state.ProductFamily = action.payload;
        state.error = null;
        state.isProductFamilysFetched = true;
      })
      .addCase(ProductFamilyRequest.rejected, (state, action) => {
        state.ProductFamily = null;
        state.error = action.error.message;
        state.isProductFamilysFetched = false;
      });
  },
});

export default ProductFamilySlice.reducer;
