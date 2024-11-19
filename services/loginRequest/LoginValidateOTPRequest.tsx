import axios from "axios";
import API from "../../API";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LoginValidOTPReq,
  LoginValidOTPResp,
} from "../../types/loginTypes/loginWOTPTypes/LoginValidateOTPTypes";

export const LoginValidateOTPRequest = async (
  data: LoginValidOTPReq
): Promise<LoginValidOTPResp> => {
  try {
    const response = await axios.post(`${API.LOGIN.VALIDATE}`, data);
    return response.data;
  } catch (err) {
    return {
      message: false,
      statusCode: 0,
    };
  }
};
