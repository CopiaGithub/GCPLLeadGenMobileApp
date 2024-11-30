import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../API";

export const DistrictRequest = createAsyncThunk(
  "districtData/fetchDistrictData",
  async (stateID: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API.GET_DISTRICTS}/${stateID}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
