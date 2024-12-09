import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../API";
import { GetVisitorReq } from "../../types/leadTypes/GetLeadsTypes";

export const GetLeadDataRequest = createAsyncThunk(
  "leadDataData/fetchLeadDataData",
  async (req: GetVisitorReq, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API.LEAD_MASTER}/sbuId/${req.subId}/${req.userId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
