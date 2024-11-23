import axios from "axios";
import API from "../../API";
import {
  LoginSendOTPReq,
  LoginSendOTPResp,
} from "../../types/loginTypes/loginWOTPTypes/LoginSentOTPTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const LoginSendOTPRequest = async (
  data: LoginSendOTPReq
): Promise<LoginSendOTPResp> => {
  try {
    const response = await axios.post(`${API.LOGIN.GENERATE_OTP}`, data);
    return response.data;
  } catch (err) {
    return {
      message: "Something went wrong",
      statusCode: 0,
      error: "",
    };
  }
};
