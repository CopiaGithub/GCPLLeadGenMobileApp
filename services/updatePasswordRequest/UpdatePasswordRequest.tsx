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

export const UpdatePasswordRequest = async (
  data: UpdatePasswordReq
): Promise<UpdatePasswordResp> => {
  try {
    const response = await axios.patch(
      `${API.PASSWORD.UPDATE}/${data.id}`,
      data
    );
    return response.data;
  } catch (err) {
    return {
      message: "Something went wrong!",
      status: false,
      statusCode: 0,
    };
  }
};
