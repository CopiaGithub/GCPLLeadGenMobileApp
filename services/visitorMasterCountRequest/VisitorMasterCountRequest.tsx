import axios from "axios";
import API from "../../API";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { VisitorMasterCount } from "../../types/visitorMasterCountTypes/VisitorMasterCountType";

export const VisitorMasterCountRequest = async (
  id: number
): Promise<VisitorMasterCount> => {
  try {
    const response = await axios.get(
      `${API.VISITOR_MASTER_COUNT}/${id == 4 ? 0 : id}`
    );
    return response.data;
  } catch (err) {
    return {
      totalVisitorDetails: 0,
    };
  }
};
