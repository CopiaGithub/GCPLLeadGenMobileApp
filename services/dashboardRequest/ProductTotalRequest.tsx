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

      const response = await axios.get(
        `${API.PRODUCT_INTERESTED}/${sbuID == 4 ? 0 : sbuID}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
