import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../API";

export const RoleMasterRequest = createAsyncThunk(
  "roleMasterData/fetchRoleMasterData",
  async (data: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API.ROLE_MASTER}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
