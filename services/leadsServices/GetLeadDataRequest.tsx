import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../API";

export const GetLeadDataRequest = createAsyncThunk(
  "leadDataData/fetchLeadDataData",
  async (sbuID: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API.LEAD_MASTER}/sbuId/${sbuID}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
