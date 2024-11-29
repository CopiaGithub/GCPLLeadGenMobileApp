import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../API";

export const SBUMasterRequest = createAsyncThunk(
  "sbuMasterData/fetchSBUMasterData",
  async (data: null, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API.SBU_MASTER}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
