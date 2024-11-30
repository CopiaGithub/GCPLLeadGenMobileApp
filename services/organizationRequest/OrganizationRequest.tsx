import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../API";

export const OrganizationRequest = createAsyncThunk(
  "getOrgData/fetchOrgData",
  async (data: {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API.ORGANIZATION.DROPDOWN}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
