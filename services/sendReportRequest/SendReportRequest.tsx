import axios from "axios";
import API from "../../API";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LoginValidOTPReq,
  LoginValidOTPResp,
} from "../../types/loginTypes/loginWOTPTypes/LoginValidateOTPTypes";
import {
  UpdatePasswordReq,
  UpdatePasswordResp,
} from "../../types/updatePasswordTypes/UpdatePasswordTypes";
import {
  SendReportReq,
  SendReportResp,
} from "../../types/sendReportTypes/SendReportType";

export const SendReportRequest = async (
  data: SendReportReq
): Promise<SendReportResp> => {
  try {
    const response = await axios.post(`${API.SEND_REPORT}`, data);
    return response.data;
  } catch (err) {
    return {
      filePath: "",
      message: "",
    };
  }
};
