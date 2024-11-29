import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../API";

export const ProductTotalRequest = createAsyncThunk(
  "productTotalData/fetchProductTotal",
  async (stateID: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API.PRODUCT_INTERESTED}`);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
