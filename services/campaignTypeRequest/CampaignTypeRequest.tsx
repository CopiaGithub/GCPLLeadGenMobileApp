import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../API";

export const CampaignTypeRequest = createAsyncThunk(
  "campaignTypeData/fetchCampaignTypeData",
  async (data: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API.CAMPAIGN.TYPE}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
