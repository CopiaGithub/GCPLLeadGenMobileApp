import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../API";
export interface ProductIntReq {
  sbuID: number;
  userId: number;
}
export const ProductTotalRequest = createAsyncThunk(
  "productTotalData/fetchProductTotal",
  async (reqData: ProductIntReq, { rejectWithValue }) => {
    console.warn(
      "Product Interseted",
      `${API.PRODUCT_INTERESTED}/${reqData.sbuID == 4 ? 0 : reqData.sbuID}/${
        reqData.userId
      }`
    );

    try {
      const response = await axios.get(
        `${API.PRODUCT_INTERESTED}/${reqData.sbuID == 4 ? 0 : reqData.sbuID}/${
          reqData.userId
        }`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
