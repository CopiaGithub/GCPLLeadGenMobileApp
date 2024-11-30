import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../API";

export const GetLeadDataRequest = createAsyncThunk(
  "leadDataData/fetchLeadDataData",
  async (data: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API.LEAD_MASTER}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
