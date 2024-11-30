export interface LoginSendOTPReq {
  email: string;
}

export interface LoginSendOTPResp {
  message: string;
  statusCode: number;
  error: string;
}
export enum OTPFormState {
  SEND_OTP = "SEND_OTP",
  VALIDATE_OTP = "VALIDATE_OTP",
  SUBMIT_PASS = "SUBMIT_PASS",
}
