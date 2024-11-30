import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../API";

export const ProductModelRequest = createAsyncThunk(
  "productModelData/fetchProductModelData",
  async (productID: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API.PRODUCT_FAMILY_MODEL}/${productID}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
