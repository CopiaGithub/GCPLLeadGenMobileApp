import { createSlice } from "@reduxjs/toolkit";
import { ProductModelState } from "../../types/productFamilyModelTypes/ProductModelTypes";
import { ProductModelRequest } from "../../services/productFamilyModelRequest/ProductModelRequest";

const initialState: ProductModelState = {
  ProductModel: null,
  error: undefined,
  isProductModelsFetched: false,
};

export const ProductModelSlice = createSlice({
  name: "productModelData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ProductModelRequest.pending, (state) => {
        state.ProductModel = null;
        state.error = null;
        state.isProductModelsFetched = false;
      })
      .addCase(ProductModelRequest.fulfilled, (state, action) => {
        state.ProductModel = action.payload;
        state.error = null;
        state.isProductModelsFetched = true;
      })
      .addCase(ProductModelRequest.rejected, (state, action) => {
        state.ProductModel = null;
        state.error = action.error.message;
        state.isProductModelsFetched = false;
      });
  },
});

export default ProductModelSlice.reducer;
