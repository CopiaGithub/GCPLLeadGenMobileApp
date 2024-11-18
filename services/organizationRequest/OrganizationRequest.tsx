import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../API";

export const OrganizationRequest = createAsyncThunk(
  "getOrgData/fetchOrgData",
  async () => {
    try {
      const response = await axios.get(API.ORGANIZATION.DROPDOWN);
      if (response.status == 200) {
        return response.data;
      } else {
        return "";
      }
    } catch (error) {
      return error;
    }
  }
);
