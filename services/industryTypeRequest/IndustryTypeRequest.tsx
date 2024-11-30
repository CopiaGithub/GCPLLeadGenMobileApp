import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../API";

export const IndustryTypeRequest = createAsyncThunk(
  "industryTypeData/fetchIndustryTypeData",
  async (stateID: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API.INDUSTRY_TYPE_MASTER}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
