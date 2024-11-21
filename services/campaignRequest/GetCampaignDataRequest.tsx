import axios from "axios";
import API from "../../API";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { GetCampaignDataResp } from "../../types/campaignTypes/GetCampaignsTypes";

export const GetCampaignDataRequest = createAsyncThunk(
  "getCampaign/GetCampaignData",
  async (data: {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API.CAMPAIGN.DATA}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
