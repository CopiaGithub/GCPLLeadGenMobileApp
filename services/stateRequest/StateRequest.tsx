import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../API";

export const StateRequest = createAsyncThunk(
  "stateData/fetchStateData",
  async (data: null, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API.GET_STATES}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
