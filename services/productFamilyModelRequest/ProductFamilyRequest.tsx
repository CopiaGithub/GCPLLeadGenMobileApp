import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../API";

export const ProductFamilyRequest = createAsyncThunk(
  "productFamilyData/fetchProductFamilyData",
  async (sbuID: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API.PRODUCT_FAMILY_MODEL}/${sbuID}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
