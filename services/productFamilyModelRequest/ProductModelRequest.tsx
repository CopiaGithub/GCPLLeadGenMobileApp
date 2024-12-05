import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../API";

export const ProductModelRequest = createAsyncThunk(
  "productModelData/fetchProductModelData",
  async (sbuId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API.PRODUCT_MODEL}/${sbuId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
