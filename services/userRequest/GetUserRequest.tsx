import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../API";

export const GetUsersRequest = createAsyncThunk(
  "getUserData/fetchGetUserData",
  async (data: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API.USER_MASTER}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
