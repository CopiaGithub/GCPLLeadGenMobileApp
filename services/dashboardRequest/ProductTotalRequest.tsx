import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../API";

export const ProductTotalRequest = createAsyncThunk(
  "productTotalData/fetchProductTotal",
  async (sbuID: number, { rejectWithValue }) => {
    try {
      const payload = {
        sbuId: sbuID,
      };

      const response = await axios.post(`${API.PRODUCT_INTERESTED}`, payload);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
